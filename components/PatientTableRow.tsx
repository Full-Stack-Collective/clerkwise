import React from 'react';
import { TableCell, TableRow } from './ui/table';
import { useRouter } from 'next/navigation';
import { usePatientStore } from '@/stores/currentPatientStore';
import Link from 'next/link';

type Patient = {
  created_at: string;
  id: string;
  first_name: string;
  surname: string;
};

function PatientTableRow({ patient }: { patient: Patient }) {
  const { created_at, id, first_name, surname } = patient;
  return (
    <TableRow key={id} className="cursor-pointer">
      <TableCell className="font-medium">{`${first_name} ${surname}`}</TableCell>

      <TableCell className="text-right">
        {new Date(created_at).toDateString()}
      </TableCell>
    </TableRow>
  );
}

export default PatientTableRow;
