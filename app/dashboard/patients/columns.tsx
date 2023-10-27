"use client";

import { Button } from "@/components/ui/button";
import { capitalizeWord, formatPhoneNumber } from "@/utils/textFormatters";
import { ColumnDef } from "@tanstack/react-table";
import { format, parseISO } from "date-fns";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "surname",
    header: ({ column }) => {
      return (
        <div>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-0"
          >
            <span>Surname</span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const firstName: string = row.getValue("surname");
      const formattedSurname = capitalizeWord(firstName);
      return <p className="px-2">{formattedSurname}</p>;
    },
  },
  {
    accessorKey: "first_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          First Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const firstName: string = row.getValue("first_name");
      const formattedFirstName = capitalizeWord(firstName);
      return <p className="px-2">{formattedFirstName}</p>;
    },
  },
  {
    accessorKey: "date_of_birth",
    header: () => <div className="w-">Date of Birth</div>,
    enableGlobalFilter: false,
    cell: ({ row }) => {
      const dateOfBirth: string = row.getValue("date_of_birth");
      return <p className="px-2">{format(parseISO(dateOfBirth), "PP")}</p>;
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    enableGlobalFilter: false,
    cell: ({ row }) => {
      const phoneNumber: string = row.getValue("phone");
      return <p className="px-2">{formatPhoneNumber(phoneNumber)}</p>;
    },
  },
  {
    accessorKey: "city",
    header: "City",
    enableGlobalFilter: false,
    cell: ({ row }) => {
      const city: string = row.getValue("city");
      return <p className="px-2">{capitalizeWord(city)}</p>;
    },
  },

  // {
  //   accessorKey: 'email',
  //   header: 'Email',
  //   enableGlobalFilter: false,

  // },
];
