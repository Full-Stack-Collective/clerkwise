import NewPatientExam from '@/components/NewPatientExam';
import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// This function to be moved to avoid duplication

const supabase = createServerComponentClient({ cookies });
const getPatientChart = async (patientId: string) => {
  return await supabase.from('Patients').select('*').eq('id', patientId);
};

const ExamHome = async ({ params }: { params: { id: string } }) => {
  const { id: patientId } = params;

  const { data } = await getPatientChart(patientId);
  const [{ first_name, surname }] = data as Patient[];

  return (
    <div>
      <NewPatientExam
        patientId={patientId}
        patientFirstName={first_name}
        patientLastName={surname}
      />
    </div>
  );
};

export default ExamHome;
