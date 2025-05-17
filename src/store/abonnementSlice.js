import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  getAbonnements,
  addAbonnement,
  updateAbonnement,
  deleteAbonnement
} from '../api/abonnements/abonnementServices';

export const useAbonnementStore = create(
  persist(
    (set) => ({
      abonnements: [],

      setAbonnements: list => set({ abonnements: list }),

      fetchAbonnements: async (token, page, perPage) => {
        const res = await getAbonnements(token, page, perPage);
        if (res.success) {
          set({ abonnements: res.data.abonnements });
          return res.data.meta;
        }
        return null;
      },

      createAbonnement: async (abonnementData, token) => {
        const res = await addAbonnement(abonnementData, token);
        if (res.success) {
          set(state => ({
            abonnements: [...state.abonnements, res.data]
          }));
        }
        return res;
      },

      modifyAbonnement: async (id, abonnementData, token) => {
        const res = await updateAbonnement(id, abonnementData, token);
        if (res.success) {
          set(state => ({
            abonnements: state.abonnements.map(a =>
              a.id === id ? res.data : a
            )
          }));
        }
        return res;
      },

      removeAbonnement: async (id, token) => {
        const res = await deleteAbonnement(id, token);
        if (res.success) {
          set(state => ({
            abonnements: state.abonnements.filter(a => a.id !== id)
          }));
        }
        return res;
      }
    }),
    {
      name: 'abonnements-storage',
    }
  )
);
