import { create } from 'zustand';


const initialState = {
  providerId: '',
  patientId: '',
  patientFirstName: '',
  patientLastName: '',
};

export const usePatientStore = create<CurrentPatient>((set) => ({
  ...initialState,
  reset: () => set(initialState),
}));
