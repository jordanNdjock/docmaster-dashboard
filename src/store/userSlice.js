import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  fetchAllUsers as apiFetchAllUsers,
  updateUser as apiUpdateUser,
  removeUser as apiRemoveUser,
  blockUser as apiBlockUser,
  restoreUser as apiRestoreUser
} from '../api/users/userServices';
import { useAuthStore } from './authSlice';

export const useUserStore = create(
  persist(
    (set) => ({
      users: [],

      fetchAllUsers: async (page, perPage) => {
        const token = useAuthStore.getState().token;
        const res = await apiFetchAllUsers(token, page, perPage);
        if (res.success) {
          set({ users: res.data.users });
          return res.data.meta;
        }
        return null;
      },

      modifyUser: async (id, userData) => {
        const token = useAuthStore.getState().token;
        const res = await apiUpdateUser(id, userData, token);
        if (res.success) {
          set(state => ({
            users: state.users.map(u =>
              u.id === id ? res.data : u
            )
          }));
        }
      },

      deleteUser: async (id) => {
        const token = useAuthStore.getState().token;
        const res = await apiRemoveUser(id, token);
        if (res.success) {
          set(state => ({
            users: state.users.filter(u => u.id !== id)
          }));
        }
      },

      blockUser: async (id) => {
        const token = useAuthStore.getState().token;
        const res = await apiBlockUser(id, token);
        if (res.success) {
          set(state => ({
            users: state.users.map(u =>
              u.id === id ? { ...u, supprime: true } : u
            )
          }));
          return res.data.user;
        }
      },

      restoreUser: async (id) => {
        const token = useAuthStore.getState().token;
        const res = await apiRestoreUser(id, token);
        if (res.success) {
          set(state => ({
            users: state.users.map(u =>
              u.id === id ? { ...u, supprime: false } : u
            )
          }));
          return res.data.user;
        }
      },
    }),
    {
      name: 'user-storage'
    }
  )
);
