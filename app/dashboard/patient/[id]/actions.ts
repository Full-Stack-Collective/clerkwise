'use server';

import {examFormSchema} from '@/components/NewPatientExam';
import {formSchema} from '@/components/RegisterPatient';
import { usePatientStore } from '@/stores/currentPatientStore';
import { useProviderStore } from '@/stores/currentProviderStore';
import {createServerActionClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import {z} from 'zod';

// Should this request be made as a client
const supabase = createServerActionClient({cookies});
export const editClinicalRecord = async (

  formData: z.infer<typeof examFormSchema>
) => {
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
    const {error} = await supabase
      .from('clinical_records')
      .update({
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
      })
      .eq('patient', patientId);

    if (error) throw new Error(`There was a problem: ${error}`);
  } catch (error: unknown) {
    if (error) {
      throw new Error('Something went wrong:', error);
    }
  }
};
export const editPatientData = async (

  patientData: z.infer<typeof formSchema>,
  providerId: string,
  practiceId: string,
  patientId: string,
) => {
  const {
    firstName,
    surname,
    sex,
    dateOfBirth,
    email,
    phone,
    city,
    streetAddress,
    emergencyContactName,
    emergencyContact,
  
  } = patientData;
  
  
  
  try {
    const {error} = await supabase
      .from('Patients')
      .update({ first_name: firstName,
        surname,
        sex,
        date_of_birth: dateOfBirth,
        email,
        phone,
        street_address: streetAddress,
        city,
        emergency_contact_name: emergencyContactName,
        emergency_contact: emergencyContact,
        primary_provider: providerId,
        practice: practiceId,
        })
        .eq('patient', patientId);
        if (error) throw new Error(`There was a problem: ${error}`);
      } catch (error: unknown) {
        if (error) {
          throw new Error('Something went wrong:', error);
        }
      }
};
