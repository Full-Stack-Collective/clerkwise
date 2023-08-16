import { PatientDetails } from '@/components/PatientDetails';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import React from 'react';
import { cookies } from 'next/headers';

const supabase = createServerComponentClient({ cookies });

async function PatientChart() {
  const { data: patientData } = await supabase
    .from('Patients')
    .select('*')
    .eq('id', 'ac680e41-7932-4554-8e39-f59a31410f64');

  return (
    <div className="max-w-2xl w-full">
      <h1 className="text-xl font-semibold text-center mb-7">Patient Chart</h1>
      <PatientDetails patientData={patientData}/>
    </div>
  );
}

export default PatientChart;
