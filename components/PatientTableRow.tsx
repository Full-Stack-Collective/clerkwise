import React from 'react';
import Link from 'next/link';
import { Separator } from './ui/separator';

type Patient = {
  accessed_at: string;
  id: string;
  first_name: string;
  surname: string;
};

function PatientTableRow({ patient }: { patient: Patient }) {
  const { accessed_at, id, first_name, surname } = patient;
  return (
    <li key={id} className="cursor-pointer hover:bg-slate-100">
      <Link href={`/dashboard/patient/${id}`} className='flex justify-between my-2 p-2'>
        <p className="font-medium text-sm">{`${first_name} ${surname}`}</p>
        <p className="text-right font-light text-sm">{new Date(accessed_at).toDateString()}</p>
      </Link>
      <Separator/>
    </li>
  );
}

export default PatientTableRow;
