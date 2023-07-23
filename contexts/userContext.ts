import { createContext } from 'react';

export const UserContext = createContext<UserInfo>({ providerId: '', practiceId: '' });
