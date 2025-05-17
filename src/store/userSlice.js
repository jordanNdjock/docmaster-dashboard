import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login as apiLogin, logout as apiLogout } from '../api/auth/authServices';
import {
  fetchAllUsers as apiFetchAllUsers,
  updateUser as apiUpdateUser,
  removeUser as apiRemoveUser,
  blockUser as apiBlockUser,
  restoreUser as apiRestoreUser
} from '../api/users/userServices';

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      users: [],
      isAuthenticated: false,

      fetchAllUsers: async (token, page, perPage) => {
        const res = await apiFetchAllUsers(token, page, perPage);
        if (res.success) {
          set({ users: res.data.users });
          return res.data.meta;
        }
        return null;
      },

      modifyUser: async (id, userData, token) => {
        const res = await apiUpdateUser(id, userData, token);
        if (res.success) {
          set(state => ({
            users: state.users.map(u =>
              u.id === id ? res.data.user : u
            )
          }));
        }
        throw new Error(res.message || 'Login failed');
      },

      deleteUser: async (id, token) => {
        const res = await apiRemoveUser(id, token);
        if (res.success) {
          set(state => ({
            users: state.users.filter(u => u.id !== id)
          }));
        }
        throw new Error(res.message || 'Login failed');
      },

      blockUser: async (id, token) => {
        const res = await apiBlockUser(id, token);
        if (res.success) {
          set(state => ({
            users: state.users.map(u =>
              u.id === id ? { ...u, supprime: true } : u
            )
          }));
          return res.data.user;
        }
        throw new Error(res.message || 'Login failed');
      },

      restoreUser: async (id, token) => {
        const res = await apiRestoreUser(id, token);
        if (res.success) {
          set(state => ({
            users: state.users.map(u =>
              u.id === id ? { ...u, supprime: false } : u
            )
          }));
          return res.data.user;
        }
        throw new Error(res.message || 'Login failed');
      },

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
        throw new Error(res.message || 'Login failed');
      }
    }),
    {
      name: 'user-storage'
    }
  )
);
