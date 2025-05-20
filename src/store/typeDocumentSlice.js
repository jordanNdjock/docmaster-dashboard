import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  getTypeDocuments,
  addTypeDocument,
  updateTypeDocument,
  deleteTypeDocument as apiDeleteTypeDocument
} from '../api/type_documents/typeDocumentServices';
import { useAuthStore } from './authSlice';

export const useTypeDocumentStore = create(
  persist(
    (set) => ({
      typeDocuments: [],

      fetchTypeDocuments: async (page, perPage) => {
        const token = useAuthStore.getState().token;
        const res = await getTypeDocuments(token, page, perPage);
        if (res.success) {
          set({ typeDocuments: res.data.type_documents });
          return res.data.meta;
        }
        return null;
      },

      createTypeDocument: async (docData) => {
        const token = useAuthStore.getState().token;
        const res = await addTypeDocument(docData, token);
        if (res.success) {
          set(state => ({
            typeDocuments: [...state.typeDocuments, res.data]
          }));
        }
      },

      updateTypeDocument: async (id, docData) => {
        const token = useAuthStore.getState().token;
        const res = await updateTypeDocument(id, docData, token);
        if (res.success) {
          set(state => ({
            typeDocuments: state.typeDocuments.map(item =>
              item.id === res.data.id ? res.data : item
            )
          }));
        }
      },

      deleteTypeDocument: async (id) => {
        const token = useAuthStore.getState().token;
        const res = await apiDeleteTypeDocument(id, token);
        if (res.success) {
          set(state => ({
            typeDocuments: state.typeDocuments.filter(item => item.id !== id)
          }));
        }
      }
    }),
    {
      name: 'type-document-storage'
    }
  )
);
