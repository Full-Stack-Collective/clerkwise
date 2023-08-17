import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { capitalizeWord, formatDate } from '@/utils/textFormatters';
import { calculateAge } from '@/utils/calculators';

export function PatientDetails({ patientData }: any) {
  const [
    {
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
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>
          {first_name} {surname}
        </CardTitle>
        <CardDescription>{capitalizeWord(sex)}</CardDescription>
        <CardDescription>
          {' '}
          {formatDate(date_of_birth)} {`(${calculateAge(date_of_birth)} years)`}
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
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}
