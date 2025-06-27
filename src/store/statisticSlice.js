import { create } from 'zustand';
import { getAllStatistics } from '../api/statistics/statisticServices';
import { useAuthStore } from './authSlice';

export const useStatisticStore = create((set) => ({
  statistics: null,
  
  fetchAllStatistics: async () => {
    const token = useAuthStore.getState().token;
    const res = await getAllStatistics(token);
    if (res.success) {
        set({ statistics: res.data.statistics });
    }
  },

}));
