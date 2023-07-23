'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const addPatient = async (formData) => {
  const supabase = createServerActionClient({ cookies });

  const { presentingComplaint, pastMedicalHistory, bloodPressure, diagnosis, plan } = formData

  const {
    data: {
      user: { id: provider },
    },
  } = await supabase.auth.getUser();

  const { data: patientResult } = await supabase.from('Patients').select('id').eq('first_name', 'Joe').eq('surname', 'Cool')

  const [{ id: patientId }] = patientResult

  
  const { error } = await supabase
  .from('Clinical Records')
  .insert({ patient: patientId, provider: provider, presenting_complaint: presentingComplaint, past_medical_history: pastMedicalHistory, blood_pressure: bloodPressure, diagnosis, plan})

  if(error) console.error(error)

};
