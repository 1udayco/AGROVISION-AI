import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  state: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User, token: string) => void;
  logout: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setUser: (user, token) => {
    if (typeof window !== 'undefined') localStorage.setItem('agrovision_token', token);
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    if (typeof window !== 'undefined') localStorage.removeItem('agrovision_token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  hydrate: () => {
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem('agrovision_token');
    if (token) set({ token, isAuthenticated: true });
  },
}));
