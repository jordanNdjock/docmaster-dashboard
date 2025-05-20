import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  getDocmasters,
  showDocmaster,
  forceDeleteDocmaster
} from '../api/docmasters/docmasterServices';
import { useAuthStore } from './authSlice';

export const useDocmasterStore = create(
  persist(
    (set) => ({
      docmasters: [],

      fetchDocmasters: async (page, perPage) => {
        const token = useAuthStore.getState().token;
        const res = await getDocmasters(token, page, perPage);
        if (res.success) {
          set({ docmasters: res.data.declarations });
          return res.data.meta;
        }
        return null;
      },

      showDocmaster: async (id) => {
        const token = useAuthStore.getState().token;
        const res = await showDocmaster(id);
        if (res.success) {
          set(state => ({
            docmasters: state.docmasters.map(d =>
              d.id === id ? res.data : d
            )
          }));
        }
      },

      forceDeleteDocmaster: async (id) => {
        const token = useAuthStore.getState().token;
        const res = await forceDeleteDocmaster(id);
        if (res.success) {
          set(state => ({
            docmasters: state.docmasters.filter(d => d.id !== id)
          }));
        }
      }
    }),
    {
      name: 'docmasters-storage',
    }
  )
);