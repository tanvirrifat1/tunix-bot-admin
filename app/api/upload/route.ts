import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();

    // Support both single 'file' and multiple 'files' / 'file' entries
    const allFiles: File[] = [
      ...data.getAll('files'),
      ...data.getAll('file'),
    ].filter((f): f is File => f instanceof File && f.size > 0);

    if (allFiles.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No valid files provided' },
        { status: 400 }
      );
    }

    const uploadedFiles: Array<{ url: string; fileName: string; size: number }> = [];
    const isVercel = Boolean(process.env.VERCEL);
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    for (const file of allFiles) {
      if (!file.type.startsWith('image/')) {
        continue;
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      if (isVercel) {
        // Vercel serverless has a read-only filesystem.
        // Return base64 Data URL so images display and persist seamlessly.
        const mime = file.type || 'image/png';
        const base64 = buffer.toString('base64');
        const dataUrl = `data:${mime};base64,${base64}`;
        uploadedFiles.push({
          url: dataUrl,
          fileName: file.name,
          size: file.size,
        });
      } else {
        // Local environment: save to public/uploads
        try {
          await mkdir(uploadDir, { recursive: true });
          const timestamp = Date.now();
          const randomSuffix = Math.random().toString(36).substring(2, 7);
          const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
          const fileName = `${timestamp}-${randomSuffix}-${cleanFileName}`;
          const filePath = path.join(uploadDir, fileName);

          await writeFile(filePath, buffer);
          uploadedFiles.push({
            url: `/uploads/${fileName}`,
            fileName: file.name,
            size: file.size,
          });
        } catch {
          // If filesystem write fails, fallback to base64 Data URL
          const mime = file.type || 'image/png';
          const base64 = buffer.toString('base64');
          const dataUrl = `data:${mime};base64,${base64}`;
          uploadedFiles.push({
            url: dataUrl,
            fileName: file.name,
            size: file.size,
          });
        }
      }
    }

    if (uploadedFiles.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No valid images were uploaded. Only image files are accepted.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      url: uploadedFiles[0].url,
      urls: uploadedFiles.map((f) => f.url),
      files: uploadedFiles,
      count: uploadedFiles.length,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'File upload failed';
    console.error('File upload error:', message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
