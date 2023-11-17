'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import PatientTableRow from './PatientTableRow';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type RecentPatient = {
  accessed_at: string;
  id: string;
  first_name: string;
  surname: string;
};

export default function RecentPatients({
  recentPatients,
}: {
  recentPatients: RecentPatient[] | null;
}) {

  const supabase = createClientComponentClient()
  const router = useRouter();

  useEffect(()=>{
    const channel = supabase.channel('realtime patients').on('postgres_changes', {
      event: '*',
      schema: 'public', 
      table: 'Patients'
    }, ()=>{
      router.refresh()
    }).subscribe();

    return () => {
      supabase.removeChannel(channel)
    }
  },[supabase, router])

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="text-xl">Recent Patients</CardTitle>
        <CardDescription>Your most recently used charts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between p-2">
          <p className="font-medium text-muted-foreground max-w-[180px]">
            Name
          </p>
          <p className="font-medium text-muted-foreground text-right">
            Last Seen
          </p>
        </div>
        <ul className="list-none">
          {recentPatients ? (
            recentPatients.map((patient) => {
              return <PatientTableRow patient={patient} key={patient.id} />;
            })
          ) : (
            <p>Recent patients could not be loaded</p>
          )}
        </ul>
      </CardContent>
    </Card>
  );
}
