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
    (set, get) => ({
      abonnements: [],

      setAbonnements: list => set({ abonnements: list }),

      fetchAbonnements: async (token, page, perPage) => {
        let result = await getAbonnements(token, page,perPage);
        const data = result.data.abonnements;
        set({ abonnements: data });
        return result.data.meta;
      },

      createAbonnement: async (abonnementData, token) => {
        const newItem = await addAbonnement(abonnementData, token);
        set(state => ({ abonnements: [...state.abonnements, newItem.data] }));
      },

      modifyAbonnement: async (id, abonnementData, token) => {
        const updated = await updateAbonnement(id, abonnementData, token);
        set(state => ({
          abonnements: state.abonnements.map(a =>
            a.id === id ? updated.data : a
          )
        }));
      },

      removeAbonnement: async (id, token) => {
        await deleteAbonnement(id, token);
        set(state => ({
          abonnements: state.abonnements.filter(a => a.id !== id)
        }));
      },
    }),
    {
      name: 'abonnements-storage',
    }
  )
);
