'use server';

import { soapFormSchema } from '@/components/SoapAssessmentForm';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { z } from 'zod';

export async function createSoapAssessment(
  formData: z.infer<typeof soapFormSchema>,
) {
  'use server';
  const supabase = createServerActionClient({ cookies });
  const {
    subjectiveFindings,
    objectiveFindings,
    assessment,
    plan,
    bloodPressure,
    heartRate,
    respiratoryRate,
    oxygenSaturation,
    temperature,
    randomBloodSugar,
    urine,
    patientId,
    providerId,
  } = formData;

  try {
    const { error } = await supabase.from('soap_assessments').insert({
      patient: patientId,
      provider: providerId,
      subjective_findings: subjectiveFindings,
      objective_findings: objectiveFindings,
      assessment,
      blood_pressure: bloodPressure,
      heart_rate: parseInt(heartRate as string),
      respiratory_rate: parseInt(respiratoryRate as string),
      oxygen_saturation: parseInt(oxygenSaturation as string),
      temperature: parseInt(temperature as string),
      random_blood_sugar: parseInt(randomBloodSugar as string),
      urine,
      plan,
    });

    if (error) throw new Error(`There was a problem: ${error}`);
  } catch (error: unknown) {
    if (error) {
      console.error(error);
      throw new Error('Something went wrong:', error);
    }
  }
}

export const updateSoapAssessment = async (
  formData: z.infer<typeof soapFormSchema>,
) => {
  const supabase = createServerActionClient({ cookies });
  const {
    id,
    subjectiveFindings,
    objectiveFindings,
    assessment,
    plan,
    bloodPressure,
    heartRate,
    respiratoryRate,
    oxygenSaturation,
    temperature,
    randomBloodSugar,
    urine,
    patientId,
  } = formData;

  console.log('>>>>',id)

  try {
    const { error } = await supabase
      .from('soap_assessments')
      .update({
        subjective_findings: subjectiveFindings,
        objective_findings: objectiveFindings,
        assessment,
        blood_pressure: bloodPressure,
        heart_rate: parseInt(heartRate as string),
        respiratory_rate: parseInt(respiratoryRate as string),
        oxygen_saturation: parseInt(oxygenSaturation as string),
        temperature: parseInt(temperature as string),
        random_blood_sugar: parseInt(randomBloodSugar as string),
        urine,
        plan,
      })
      .eq('patient', patientId)
      .eq('id', id);

    if (error) throw new Error(`There was a problem: ${error}`);
  } catch (error: unknown) {
    if (error) {
      console.log(error);
      // throw new Error('Something went wrong:',error);
    }
  }
};
