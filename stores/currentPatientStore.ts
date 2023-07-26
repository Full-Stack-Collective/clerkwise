import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CurrentPatientState = {
  currentPatient: CurrentPatient;
  setCurrentPatient(currentPatient: CurrentPatient): void;
};

export const usePatientStore = create(
  persist<CurrentPatientState>(
    (set) => ({
      currentPatient: { patientId: '', patientFirstName: '', patientLastName: '' },
      setCurrentPatient: (currentPatient) => set({ currentPatient }),
    }),
    {
      name: 'current-patient',
    }
  )
);
