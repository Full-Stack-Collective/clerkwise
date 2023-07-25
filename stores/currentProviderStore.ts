import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type CurrentProviderState = {
  providerInfo: ProviderInfo;
  setProviderInfo(providerInfo: ProviderInfo): void;
};

export const useUserStore = create(
  persist<CurrentProviderState>(
    (set) => ({
      providerInfo: { practiceId: '', providerId: '' },
      setProviderInfo: (providerInfo: ProviderInfo) => set({ providerInfo }),
    }),
    {
      name: 'current-provider',
    }
  )
);
