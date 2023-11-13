import NewPatientExam from '@/components/NewPatientExam';
import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { useProviderStore } from '@/stores/currentProviderStore';

// This function to be moved to avoid duplication

const supabase = createServerComponentClient({ cookies });
const getPatientChart = async (patientId: string) => {
  return await supabase.from('Patients').select('*').eq('id', patientId);
};

const ExamHome = async ({ params }: { params: { id: string } }) => {
  const { id: patientId } = params;

  const { data } = await getPatientChart(patientId);
  const [{ id , first_name, surname, primary_provider }] = data as Patient[];

  return (
    <div>
      <NewPatientExam
        patientId={id as string}
        patientFirstName={first_name}
        patientLastName={surname}
        providerId={primary_provider as string}
      />
    </div>
  );
};

export default ExamHome;
