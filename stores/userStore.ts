import { create } from 'zustand';

type UserState = {
  userInfo: UserInfo;
  setUserInfo(userInfo: UserInfo): void;
};

export const useUserStore = create<UserState>((set) => ({
  userInfo: { practiceId: '', providerId: '' },
  setUserInfo: (userInfo: UserInfo) => set({ userInfo }),
}));
