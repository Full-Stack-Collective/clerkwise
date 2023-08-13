import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CurrentPatientState = {
  currentPatient: CurrentPatient;
  setCurrentPatient(currentPatient: CurrentPatient): void;
  reset: () => void;
};

const initialState = {
  patientId: '',
  patientFirstName: '',
  patientLastName: '',
};

export const usePatientStore = create(
  persist<CurrentPatientState>(
    (set) => ({
      currentPatient: {
        ...initialState,
      },
      setCurrentPatient: (currentPatient) => set({ currentPatient }),
      reset: () =>
        set({
          currentPatient: {
            ...initialState,
          },
        }),
    }),
    {
      name: 'current-patient',
    }
  )
);
