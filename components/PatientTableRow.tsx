import React from 'react';
import { TableCell, TableRow } from './ui/table';
import Link from 'next/link';
import { Separator } from './ui/separator';

type Patient = {
  created_at: string;
  id: string;
  first_name: string;
  surname: string;
};

function PatientTableRow({ patient }: { patient: Patient }) {
  const { created_at, id, first_name, surname } = patient;
  return (
    <li key={id} className="cursor-pointer hover:bg-slate-100">
      <Link href={`/dashboard/patient/${id}`} className='flex justify-between my-2 p-2'>
        <p className="font-medium">{`${first_name} ${surname}`}</p>
        <p className="text-right font-light">{new Date(created_at).toDateString()}</p>
      </Link>
      <Separator/>
    </li>
  );
}

export default PatientTableRow;
