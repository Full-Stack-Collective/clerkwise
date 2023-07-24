// 'use server';

// import { useUserStore } from '@/stores/userStore';
// import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';


// // Should this request be made as a client

// export const createClinicalRecord = async (formData: any) => {
//   const supabase = createServerActionClient({ cookies });

//   const { presenting_complaint: presentingComplaint, past_medical_history: pastMedicalHistory, blood_pressure: bloodPressure, diagnosis, plan } = formData



//   const { data: patientResult } = await supabase.from('Patients').select('id').eq('first_name', 'Joe').eq('surname', 'Cool')

//   const [{ id: patientId }] = patientResult

  
//   const { error } = await supabase
//   .from('Clinical Records')
//   .insert({ patient: patientId, provider: provider, presenting_complaint: presentingComplaint, past_medical_history: pastMedicalHistory, blood_pressure: bloodPressure, diagnosis, plan})

//   if(error) console.error(error)

// };
