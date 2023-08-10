'use server';

import { examFormSchema } from '@/components/NewPatientExam';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { z } from 'zod';

// Should this request be made as a client

export const createClinicalRecord = async (formData: z.infer<typeof examFormSchema>) => {
  const supabase = createServerActionClient({ cookies });

  const {
    presentingComplaint,
    historyPresentingComplaint,
    pastMedicalHistory,
    drugHistory,
    familyHistory,
    socialHistory,
    allergies,
    systemsReview,
    onExamination,
    observations,
    focusedFindings,
    bloodPressure,
    heartRate,
    respiratoryRate,
    oxygenSaturation,
    temperature,
    randomBloodSugar,
    urine,
    differentialDiagnosis,
    diagnosis,
    plan,
    patientId,
    providerId,
  } = formData;

  const { error } = await supabase.from('Clinical Records').insert({
    patient: patientId,
    provider: providerId,
    presenting_complaint: presentingComplaint,
    history_presenting_complaint: historyPresentingComplaint,
    past_medical_history: pastMedicalHistory,
    drug_history: drugHistory,
    family_history: familyHistory,
    social_history: socialHistory,
    allergies,
    systems_review: systemsReview,
    on_examination: onExamination,
    observations,
    focused_findings: focusedFindings,
    blood_pressure: bloodPressure,
    heart_rate: parseInt(heartRate),
    respiratory_rate: parseInt(respiratoryRate),
    oxygen_saturation: parseInt(oxygenSaturation),
    temperature: parseInt(temperature),
    random_blood_sugar: parseInt(randomBloodSugar),
    urine,
    differential_diagnosis: differentialDiagnosis,
    diagnosis,
    plan,
  });

  if (error) console.error(error);
  else console.log('Success!')
};
