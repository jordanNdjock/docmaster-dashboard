import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  getTypeDocuments,
  addTypeDocument,
  updateTypeDocument,
  deleteTypeDocument as apiDeleteTypeDocument
} from '../api/type_documents/typeDocumentServices';

export const useTypeDocumentStore = create(
  persist(
    (set) => ({
      typeDocuments: [],

      fetchTypeDocuments: async (token, page, perPage) => {
        const res = await getTypeDocuments(token, page, perPage);
        if (res.success) {
          set({ typeDocuments: res.data.type_documents });
          return res.data.meta;
        }
        return null;
      },

      createTypeDocument: async (docData, token) => {
        const res = await addTypeDocument(docData, token);
        if (res.success) {
          set(state => ({
            typeDocuments: [...state.typeDocuments, res.data]
          }));
        }
        return res;
      },

      updateTypeDocument: async (id, docData, token) => {
        const res = await updateTypeDocument(id, docData, token);
        if (res.success) {
          set(state => ({
            typeDocuments: state.typeDocuments.map(item =>
              item.id === res.data.id ? res.data : item
            )
          }));
        }
        return res;
      },

      deleteTypeDocument: async (id, token) => {
        const res = await apiDeleteTypeDocument(id, token);
        if (res.success) {
          set(state => ({
            typeDocuments: state.typeDocuments.filter(item => item.id !== id)
          }));
        }
        return res;
      }
    }),
    {
      name: 'type-document-storage'
    }
  )
);
