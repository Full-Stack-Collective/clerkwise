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

export function PatientDetails({ patientData }: any) {
  const [{
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
  }] = patientData;

  console.log(patientData)
  const chartFields = [
    { title: 'Email', value: email },
    { title: 'Phone Number', value: phone },
    { title: 'Address', value: `${street_address}, ${city}` },
    { title: 'Emergency Contact', value: `${emergency_contact_name}, ${emergency_contact}` },
  ];


  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{first_name} {surname}</CardTitle>
        <CardDescription>{sex}</CardDescription>
        <CardDescription> {date_of_birth} (30 years old)</CardDescription>
      </CardHeader>
      <CardContent>
        {chartFields.map((field) => (
          <p key={field.title}>
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
