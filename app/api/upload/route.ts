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

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    const uploadedFiles: Array<{ url: string; fileName: string; size: number }> = [];

    for (const file of allFiles) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        continue;
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const timestamp = Date.now();
      const randomSuffix = Math.random().toString(36).substring(2, 7);
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const fileName = `${timestamp}-${randomSuffix}-${cleanFileName}`;

      const filePath = path.join(uploadDir, fileName);
      await writeFile(filePath, buffer);

      const publicUrl = `/uploads/${fileName}`;
      uploadedFiles.push({
        url: publicUrl,
        fileName: file.name,
        size: file.size,
      });
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
