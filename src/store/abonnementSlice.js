import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  getAbonnements,
  addAbonnement,
  updateAbonnement,
  deleteAbonnement
} from '../api/abonnements/abonnementServices';
import { useAuthStore } from './authSlice';

export const useAbonnementStore = create(
  persist(
    (set) => ({
      abonnements: [],

      fetchAbonnements: async (page, perPage) => {
        const token = useAuthStore.getState().token;
        const res = await getAbonnements(token, page, perPage);
        if (res.success) {
          set({ abonnements: res.data.abonnements });
          return res.data.meta;
        }
        return null;
      },

      createAbonnement: async (abonnementData) => {
        const token = useAuthStore.getState().token;
        const res = await addAbonnement(abonnementData, token);
        if (res.success) {
          set(state => ({
            abonnements: [...state.abonnements, res.data]
          }));
        }
      },

      modifyAbonnement: async (id, abonnementData) => {
        const token = useAuthStore.getState().token;
        const res = await updateAbonnement(id, abonnementData, token);
        if (res.success) {
          set(state => ({
            abonnements: state.abonnements.map(a =>
              a.id === id ? res.data : a
            )
          }));
        }
      },

      removeAbonnement: async (id) => {
        const token = useAuthStore.getState().token;
        const res = await deleteAbonnement(id, token);
        if (res.success) {
          set(state => ({
            abonnements: state.abonnements.filter(a => a.id !== id)
          }));
        }
      }
    }),
    {
      name: 'abonnements-storage',
    }
  )
);
