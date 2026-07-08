'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { authAPI } from '@/lib/api';

export function useAuth() {
  const { user, token, isAuthenticated, setUser, logout, hydrate } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    hydrate();
    const stored = typeof window !== 'undefined' ? localStorage.getItem('agrovision_token') : null;
    if (stored && !user) {
      authAPI.me()
        .then((r) => setUser(r.data.user, stored))
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const resp = await authAPI.login(email, password);
    setUser(resp.data.user, resp.data.token);
    return resp.data;
  };

  return { user, token, isAuthenticated, loading, login, logout };
}
