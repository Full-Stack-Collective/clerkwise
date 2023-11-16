export const revalidate = 0;

import { PatientDetails } from '@/components/PatientDetails';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import PatientClinicalExamCard from '@/components/PatientClinicalExamCard';
import BackButton from '@/components/BackButton';
import PatientSoapsCard from '@/components/PatientSoapsCard';
import { usePatientStore } from '@/stores/currentPatientStore';
import PatientStoreInitialiser from '@/components/PatientStoreInitializer';

const supabase = createServerComponentClient<Database>({ cookies });

const getPatientChart = async (patientId: string) => {
  return await supabase.from('Patients').select('*').eq('id', patientId);
};

const getClinicalAssesment = async (patientId: string) => {
  return await supabase
    .from('clinical_records')
    .select('*')
    .eq('patient', patientId);
};

const getSoapAssessments = async (patientId: string) => {
  return await supabase
    .from('soap_assessments')
    .select('*')
    .eq('patient', patientId)
    .order('exam_date', { ascending: false });
};

async function PatientChart({ params }: { params: { id: string } }) {
  const { id } = params;

  const { data: patientData } = await getPatientChart(id);
  const { first_name, surname, primary_provider } = patientData![0];
  const { data: clinicalAssessment } = await getClinicalAssesment(id);
  const { data: soapAssessments } = await getSoapAssessments(id);

  const clinicalAssessmentExists =
    clinicalAssessment && clinicalAssessment.length > 0;

  usePatientStore.setState({
    patientId: id,
    patientFirstName: first_name,
    patientLastName: surname,
    providerId: primary_provider!,
  });

  return (
    <div className="max-w-2xl w-full mx-auto">
      <PatientStoreInitialiser
        patientFirstName={first_name}
        patientId={id}
        patientLastName={surname}
        providerId={primary_provider as string}
      />
      <BackButton buttonType='patientChart'/>
      <h1 className="text-xl font-semibold text-center mb-7">Patient Chart</h1>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <PatientDetails patientData={patientData} />
        <div className="flex flex-col gap-3">
          {clinicalAssessment && patientData ? (
            <PatientClinicalExamCard
              clinicalAssessment={clinicalAssessment}
              patientData={patientData[0]}
            />
          ) : null}
          {clinicalAssessmentExists && patientData ? (
            <PatientSoapsCard
              soapAssessments={soapAssessments}
              patientData={patientData[0]}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default PatientChart;
