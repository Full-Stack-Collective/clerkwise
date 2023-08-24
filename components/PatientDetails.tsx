import * as React from 'react';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { capitalizeWord } from '@/utils/textFormatters';
import { calculateAge } from '@/utils/calculators';
import Link from 'next/link';
import { format } from 'date-fns';

export function PatientDetails({ patientData, clinicalAssessment }: any) {
  const [
    {
      id,
      first_name,
      surname,
      sex,
      date_of_birth,
      email,
      phone,
      street_address,
      city,
      emergency_contact_name,
      emergency_contact,
    },
  ] = patientData;

  const chartFields = [
    { title: 'Phone Number', value: phone },
    { title: 'Email', value: email },
    { title: 'Address', value: `${street_address}, ${city}` },
    {
      title: 'Emergency Contact',
      value: `${emergency_contact_name}, ${emergency_contact}`,
    },
  ];

  calculateAge(date_of_birth);

  return (
    <Card className="max-w-xs w-full">
      <CardHeader>
        <CardTitle>
          {first_name} {surname}
        </CardTitle>
        <CardDescription>{capitalizeWord(sex)}</CardDescription>
        <CardDescription>
          {format(new Date(date_of_birth), 'PPP')}{' '}
          {`(${calculateAge(date_of_birth)} years)`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="my-2">
          <span className="font-semibold">Phone Number: </span>
          {phone}
        </p>
        {street_address || city ? (
          <p className="my-2">
            <span className="font-semibold">Address: </span>
            {street_address && `${street_address},`} {city && city}
          </p>
        ) : null}
        <p className="my-2">
          <span className="font-semibold">Email: </span>
          {email}
        </p>
        {emergency_contact ? (
          <p className="my-2">
            <span className="font-semibold">Emergency Contact: </span>
            {emergency_contact_name} - {emergency_contact}
          </p>
        ) : null}
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}
