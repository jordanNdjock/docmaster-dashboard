import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  getAbonnements,
  addAbonnement,
  ShowAbonnement,
  updateAbonnement,
  deleteAbonnement
} from '../api/abonnements/abonnementServices';

export const useAbonnementStore = create(
  persist(
    (set) => ({
      abonnements: [],
      selectedAbonnement: null,

      setAbonnements: list => set({ abonnements: list }),
      setSelectedAbonnement: item => set({ selectedAbonnement: item }),
      clearSelectedAbonnement: () => set({ selectedAbonnement: null }),

      fetchAbonnements: async token => {
        let result = await getAbonnements(token);
        result = result.data.abonnements;
        set({ abonnements: result });
      },

      createAbonnement: async (abonnementData, token) => {
        const newItem = await addAbonnement(abonnementData, token);
        set(state => ({ abonnements: [...state.abonnements, newItem] }));
      },

      loadAbonnement: async (id, token) => {
        const item = await ShowAbonnement(id, token);
        set({ selectedAbonnement: item });
      },

      modifyAbonnement: async (id, abonnementData, token) => {
        const updated = await updateAbonnement(id, abonnementData, token);
        set(state => ({
          abonnements: state.abonnements.map(a =>
            a.id === id ? updated : a
          )
        }));
        return updated;
      },

      removeAbonnement: async (id, token) => {
        await deleteAbonnement(id, token);
        set(state => ({
          abonnements: state.abonnements.filter(a => a.id !== id)
        }));
      }
    }),
    {
      name: 'abonnements-storage',
    }
  )
);
