import EditPatientExam from "@/components/EditPatientExam";
import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { useProviderStore } from "@/stores/currentProviderStore";

// This function to be moved to avoid duplication

const supabase = createServerComponentClient({ cookies });
const getPatientChart = async (patientId: string) => {
  return await supabase.from("Patients").select("*").eq("id", patientId);
};

const getClinicalAssesment = async (patientId: string) => {
  return await supabase
    .from("Clinical Records")
    .select("*")
    .eq("patient", patientId);
};

const ExamHome = async ({ params }: { params: { id: string } }) => {
  const { id: patientId } = params;

  const { data } = await getPatientChart(patientId);
  const [{ first_name, surname }] = data as Patient[];
  const { data: clinicalAssessment } = await getClinicalAssesment(patientId);

  const clinicalAssessmentExists =
    clinicalAssessment !== undefined &&
    clinicalAssessment &&
    clinicalAssessment.length > 0;

  return (
    <div>
      {clinicalAssessmentExists ? (
        <EditPatientExam
          patientId={patientId}
          patientFirstName={first_name}
          patientLastName={surname}
          providerId={useProviderStore.getState().providerId}
          clinicalAssessment={clinicalAssessment[0]}
        />
      ) : null}
    </div>
  );
};

export default ExamHome;
