
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from './ui/table';
import PatientTableRow from './PatientTableRow';

export default async function RecentPatients() {
  const supabase = createServerComponentClient({ cookies });

  const { data: recentPatients, error } = await supabase
    .from('Patients')
    .select('created_at, id, first_name, surname, date_of_birth')
    .order('created_at', { ascending: false })
    .limit(8);


  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="text-xl">Recent Patients</CardTitle>
        <CardDescription>Your most recently used charts</CardDescription>
      </CardHeader>
      <CardContent>
            <div className='flex justify-between'>
              <p className="max-w-[180px]">Name</p>
              <p className="text-right">Last Seen</p>
            </div>
          <ul className='list-none'>
            {recentPatients ? (
              recentPatients.map((patient) => {
                
                return (
                  <PatientTableRow patient={patient} key={patient.id}/>
                );
              })
            ) : (
              <p>Recent patients could not be loaded</p>
            )}
          </ul>
      </CardContent>
    </Card>
  );
}
