import { PatientDetails } from '@/components/PatientDetails';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import React from 'react';
import { cookies } from 'next/headers';
import { usePatientStore } from '@/stores/currentPatientStore';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

const supabase = createServerComponentClient({ cookies });

async function PatientChart({ params }: { params: { id: string } }) {
  const { id } = params;

  const { data: patientData } = await supabase
    .from('Patients')
    .select('*')
    .eq('id', id);

  return (
    <div className="max-w-2xl w-full">
      <Link
        className={buttonVariants({ variant: 'outline', size: 'sm' })}
        href={'/dashboard'}
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </Link>

      <h1 className="text-xl font-semibold text-center mb-7">Patient Chart</h1>
      <PatientDetails patientData={patientData} />
    </div>
  );
}

export default PatientChart;
