import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login as apiLogin, logout as apiLogout } from '../api/auth/authServices';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async credentials => {
        const res = await apiLogin(credentials);
        if (res.success) {
          const token = res.data.access_token;
          const user = res.data.admin;
          set({ user, token, isAuthenticated: true });
          return user;
        }
        throw new Error(res.message || 'Login failed');
      },

      logout: async () => {
        const token = get().token;
        const res = await apiLogout(token);
        if(res.success) {
          set({ user: null, token: null, isAuthenticated: false });
        }
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);