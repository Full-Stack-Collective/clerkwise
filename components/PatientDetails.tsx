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
        {chartFields.map((field) => (
          <p key={field.title} className="my-2">
            <span className="font-semibold">{field.title}: </span> {field.value}
          </p>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}
