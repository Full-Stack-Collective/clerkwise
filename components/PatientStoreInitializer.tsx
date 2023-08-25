'use client';

import { usePatientStore } from '@/stores/currentPatientStore';
import { useRef } from 'react';

export default function PatientStoreInitialiser({
  patientId,
  patientFirstName,
  patientLastName,
  providerId,
}: CurrentPatient) {
  const initialized = useRef(false);
  if (!initialized.current) {
    usePatientStore.setState({
      patientId,
      patientFirstName,
      patientLastName,
      providerId,
    });
    initialized.current = true;
  }
  return null;
}
