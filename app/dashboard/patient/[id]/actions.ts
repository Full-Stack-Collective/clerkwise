"use server";
import { examFormSchema } from "@/components/NewPatientExam";
import { formSchema } from "@/components/EditPatientData";
import { soapFormSchema } from "@/components/SoapAssessmentForm";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { z } from "zod";

// Should this request be made as a client
const supabase = createServerActionClient({ cookies });

export const editPatientData = async (
  patientData: z.infer<typeof formSchema>
) => {
  const {
    patientId,
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
    practiceId,
    providerId,
  } = patientData;

  try {
    const { data, error } = await supabase
      .from("Patients")
      .update({
        first_name: firstName,
        surname,
        sex,
        date_of_birth: dateOfBirth,
        email,
        phone,
        street_address: streetAddress,
        city,
        emergency_contact_name: emergencyContactName,
        emergency_contact: emergencyContact,
        practice: practiceId,
        primary_provider: providerId,
      })
      .eq("id", patientId);

    if (error) throw new Error(`There was a problem: ${error}`);
  } catch (error: any) {
    if (error) {
      throw new Error("Something went wrong: in actions file", error.message);
    }
  }
};

export const updateSoapAssessment = async (
  formData: z.infer<typeof soapFormSchema>
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

  try {
    const { error } = await supabase
      .from("soap_assessments")
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
      .eq("patient", patientId)
      .eq("id", id);

    if (error) throw new Error(`There was a problem: ${error.message}`);
  } catch (error: unknown) {
    if (error) {
      throw new Error("Something went wrong");
    }
  }
};

export const editClinicalRecord = async (
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
    const { error } = await supabase
      .from("clinical_records")
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
      .eq("patient", patientId);

    if (error) throw new Error(`There was a problem: ${error}`);
  } catch (error: unknown) {
    if (error) {
      throw new Error("Something went wrong:", error);
    }
  }
};
