import { create } from 'zustand';

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
