import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
export type AppStatus = 'idle' | 'processing' | 'success' | 'error';
export interface ComparisonData {
  headers: string[];
  rows: (string | number | null)[][];
  productNames: string[];
}
export interface ComparisonState {
  files: (File | null)[];
  status: AppStatus;
  error: string | null;
  data: ComparisonData | null;
}
export interface ComparisonActions {
  setFile: (index: number, file: File | null) => void;
  setStatus: (status: AppStatus) => void;
  setError: (error: string | null) => void;
  setData: (data: ComparisonData | null) => void;
  reset: () => void;
}
const initialState: ComparisonState = {
  files: [null, null, null],
  status: 'idle',
  error: null,
  data: null,
};
export const useComparisonStore = create<ComparisonState & ComparisonActions>()(
  immer((set) => ({
    ...initialState,
    setFile: (index, file) => {
      set((state) => {
        state.files[index] = file;
      });
    },
    setStatus: (status) => {
      set({ status });
    },
    setError: (error) => {
      set({ error });
    },
    setData: (data) => {
      set({ data });
    },
    reset: () => {
      set(initialState);
    },
  }))
);