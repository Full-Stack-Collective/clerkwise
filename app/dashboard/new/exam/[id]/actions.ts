'use server';

import { examFormSchema } from '@/components/NewPatientExam';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { z } from 'zod';

// Should this request be made as a client

export const createClinicalRecord = async (
  formData: z.infer<typeof examFormSchema>
) => {
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

  try {
    const { error } = await supabase.from('clinical_records').insert({
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
      heart_rate: parseInt(heartRate as string),
      respiratory_rate: parseInt(respiratoryRate as string),
      oxygen_saturation: parseInt(oxygenSaturation as string),
      temperature: parseInt(temperature as string),
      random_blood_sugar: parseInt(randomBloodSugar as string),
      urine,
      differential_diagnosis: differentialDiagnosis,
      diagnosis,
      plan,
    });

    if (error) throw new Error(`There was a problem: ${error.message}`);
  } catch (error: any) {
    throw Error('Something went wrong:', error.message);
  }
};
