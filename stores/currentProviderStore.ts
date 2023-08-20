import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CurrentProviderState = {
  providerInfo: ProviderInfo;
  setProviderInfo(providerInfo: ProviderInfo): void;
  reset: () => void;
};

const initialState = {
  practiceId: '',
  providerId: '',
  providerFirstName: '',
  providerLastName: '',
};


export const useProviderStore = create<ProviderInfo>((set) => ({
  ...initialState,
  reset: () => set(initialState),
}));
