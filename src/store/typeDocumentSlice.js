import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {getTypeDocuments, addTypeDocument, updateTypeDocument, deleteTypeDocument} from '../api/type_documents/typeDocumentServices';

export const useTypeDocumentStore = create(
  persist(
    (set) => ({
      typeDocuments: [],

      setTypeDocuments: list => set({ typeDocuments: list }),

      fetchTypeDocuments: async (token, page, perPage) => {
        let result = await getTypeDocuments(token, page,perPage);
        const data = result.data.type_documents;
        set({ typeDocuments: data });
        return result.data.meta;
      },

      createTypeDocument: async (abonnementData, token) => {
        const newItem = await addTypeDocument(abonnementData, token);
        set(state => ({ typeDocuments: [...state.typeDocuments, newItem.data] }));
      },
      updateTypeDocument: async (typeDocumentId, typeDocumentData, token) => {
        const updatedItem = await updateTypeDocument(typeDocumentId, typeDocumentData, token);
        set(state => ({
          typeDocuments: state.typeDocuments.map(item =>
            item.id === updatedItem.data.id ? updatedItem.data : item
          )
        }));
      },
      deleteTypeDocument: async (id, token) => {
        await deleteTypeDocument(id, token);
        set(state => ({ typeDocuments: state.typeDocuments.filter(item => item.id !== id) }));
      },
    }),
    {
      name: 'type-document-storage',
    }
  )
);