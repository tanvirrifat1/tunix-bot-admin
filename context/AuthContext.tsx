'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarLetter: string;
}

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'tunix_admin_auth_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse auth from localStorage:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (
    emailOrUser: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    const cleanUser = emailOrUser.trim().toLowerCase();
    const cleanPass = password.trim();

    // Accepted usernames/emails and passwords
    const validUsers = [
      'admin',
      'admin@tunix.bot',
      'admin@gmail.com',
      'rifat',
      'rifatkhan',
      'tunix',
    ];
    const validPasswords = [
      'admin',
      'admin123',
      'tunix2026',
      '123456',
      'tunixbot',
      'tunix',
    ];

    if (
      (validUsers.includes(cleanUser) || cleanUser.endsWith('@tunix.bot')) &&
      validPasswords.includes(cleanPass)
    ) {
      const adminData: AdminUser = {
        id: 'admin-primary',
        name: 'Rifat Khan',
        email: cleanUser.includes('@') ? cleanUser : `${cleanUser}@tunix.bot`,
        role: 'Super Administrator',
        avatarLetter: 'RK',
      };

      setUser(adminData);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(adminData));
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid access credentials. Use admin@tunix.bot / admin123',
    };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    router.replace('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
