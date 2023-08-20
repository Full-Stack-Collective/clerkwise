'use client';

import { Button } from '@/components/ui/button';
import { capitalizeWord, formatDate } from '@/utils/textFormatters';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: 'surname',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Surname
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const firstName: string = row.getValue('surname');
      const formattedSurname = capitalizeWord(firstName);
      return <div className="">{formattedSurname}</div>;
    },
  },
  {
    accessorKey: 'first_name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          First Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const firstName: string = row.getValue('first_name');
      const formattedFirstName = capitalizeWord(firstName);
      return <div className="">{formattedFirstName}</div>;
    },
  },
  {
    accessorKey: 'date_of_birth',
    header: 'Date of Birth',
    enableGlobalFilter: false,
    cell: ({ row }) => {
      const dateOfBirth: string = row.getValue('date_of_birth');
      return <div>{formatDate(dateOfBirth)}</div>;
    },
  },
  {
    accessorKey: 'city',
    header: 'City',
    enableGlobalFilter: false,
    cell: ({ row }) => {
      const city: string = row.getValue('city');
      return <div>{capitalizeWord(city)}</div>;
    },
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    enableGlobalFilter: false,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    enableGlobalFilter: false,

  },
];
