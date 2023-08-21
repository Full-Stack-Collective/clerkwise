import { PatientDetails } from '@/components/PatientDetails';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import React from 'react';
import { cookies } from 'next/headers';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import PatientExamCard from '@/components/PatientExamCard';
import BackButton from '@/components/BackButton';

const supabase = createServerComponentClient({ cookies });

const getPatientChart = async (patientId: string) => {
  return await supabase.from('Patients').select('*').eq('id', patientId);
};

const getClinicalAssesment = async (patientId: string) => {
  return await supabase
    .from('Clinical Records')
    .select('*')
    .eq('patient', patientId);
};

const getSoapAssessments = async (patientId: string) => {
  return await supabase
    .from('Soap Assessments')
    .select('*')
    .eq('patient', patientId);
};

async function PatientChart({ params }: { params: { id: string } }) {
  const { id } = params;

  const { data: patientData } = await getPatientChart(id);
  const { data: clinicalAssessment } = await getClinicalAssesment(id);
  const { data: soapAssessments } = await getSoapAssessments(id);

  return (
    <div className="max-w-2xl w-full">
      {/* <Link
        className={buttonVariants({ variant: 'outline', size: 'sm' })}
        href={'/dashboard'}
      >
        <ChevronLeft className="h-4 w-4" />
        Back
  
      </Link> */}
    <BackButton />
      <h1 className="text-xl font-semibold text-center mb-7">Patient Chart</h1>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <PatientDetails patientData={patientData} />
        {clinicalAssessment && patientData ? (
          <PatientExamCard
            clinicalAssessment={clinicalAssessment}
            patientData={patientData[0]}
          />
        ) : null}
      </div>
    </div>
  );
}

export default PatientChart;
