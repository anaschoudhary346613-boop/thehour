import { create } from 'zustand';

interface LoadingState {
  progress: number;
  isLoading: boolean;
  isFinished: boolean;
  setProgress: (progress: number) => void;
  finishLoading: () => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  progress: 0,
  isLoading: true,
  isFinished: false,
  setProgress: (progress) => set({ progress }),
  finishLoading: () => set({ isLoading: false, isFinished: true }),
}));
