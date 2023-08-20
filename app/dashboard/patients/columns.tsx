'use client';

import { capitalizeWord } from '@/utils/textFormatters';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: 'first_name',
    header: () => <div className="text-right">First Name</div>,
    cell: ({ row }) => {
      const firstName: string = row.getValue('first_name');
      const formattedFirstName = capitalizeWord(firstName);
      return <div className="text-right ">{formattedFirstName}</div>;
    },
  },
  {
    accessorKey: 'surname',
    header: 'Surname',
  },
  {
    accessorKey: 'date_of_birth',
    header: 'Date of Birth',
  },
  {
    accessorKey: 'city',
    header: 'City',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
];
