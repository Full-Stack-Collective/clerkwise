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
import { title } from 'process';

export function PatientDetails() {
  const chartFields = [
    { title: 'Email' },
    { title: 'Phone Number' },
    { title: 'Address' },
    { title: 'Emergency Contact' },
  ];

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Harry Potter</CardTitle>
        <CardDescription>Male</CardDescription>
        <CardDescription>August 23, 1993 (30 years old)</CardDescription>
      </CardHeader>
      <CardContent>
          {chartFields.map(field =>
            <p key={field.title}><span className='font-semibold'>{field.title}: </span></p>)}
        
        </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}
