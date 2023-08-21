import BackButton from '@/components/BackButton';
import { RegisterPatient } from '@/components/RegisterPatient';
import React from 'react';

export default function Register() {
  return (
    <div className="max-w-md m-auto py-4">
      <BackButton />
      <RegisterPatient />
    </div>
  );
}
