import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login as apiLogin, logout as apiLogout } from '../api/auth/authServices';

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      users: [],
      isAuthenticated: false,

      setUser: user =>
        set({ user, token: user?.token ?? null, isAuthenticated: true }),

      setUsers: users =>
        set({ users }),

      updateUser: updated =>
        set(state => ({
          users: state.users.map(u =>
            u.id === updated.id ? { ...u, ...updated } : u
          )
        })),

      deleteUser: id =>
        set(state => ({
          users: state.users.filter(u => u.id !== id)
        })),

      clearUser: () =>
        set({ user: null, token: null, isAuthenticated: false }),

      login: async credentials => {
        let user = await apiLogin(credentials);
        const token = user.data.access_token;
        user = user.data.admin;
        set({ user, token, isAuthenticated: true });
        return user;
      },

      logout: async () => {
        const token = get().token;
        await apiLogout(token);
        set({ user: null, token: null, isAuthenticated: false });
      }
    }),
    {
      name: 'user-storage',
    }
  )
);
