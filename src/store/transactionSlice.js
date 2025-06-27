import { create } from 'zustand';
import {
  getTransactions
} from '../api/transactions/transactionsServices';
import { useAuthStore } from './authSlice';

export const useTransactionStore = create(

    (set) => ({
      transactions: [],

      fetchAllTransactions: async (page, perPage) => {
        const token = useAuthStore.getState().token;
        const res = await getTransactions(token, page, perPage);
        if (res.success) {
          set({ transactions: res.data.transactions });
          return res.data.meta;
        }
        return null;
      },
    }),
  
);