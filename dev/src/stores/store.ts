import { create } from "zustand";

interface StoreState {
  waterLevel: number;
  waveSpeed: number;
  waveAmplitude: number;
}

export const useStore = create<StoreState>(() => ({
  waterLevel: 0.5,
  waveSpeed: 1.2,
  waveAmplitude: 0.1,
}));
