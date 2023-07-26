import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CurrentProviderState = {
  providerInfo: ProviderInfo;
  setProviderInfo(providerInfo: ProviderInfo): void;
};

export const useUserStore = create(
  persist<CurrentProviderState>(
    (set) => ({
      providerInfo: { practiceId: '', providerId: '', providerFirstName: '', providerLastName: '' },
      setProviderInfo: (providerInfo: ProviderInfo) => set({ providerInfo }),
    }),
    {
      name: 'current-provider',
    }
  )
);
