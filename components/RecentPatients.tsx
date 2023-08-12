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
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from './ui/table';

export default async function RecentPatients() {
  const supabase = createServerComponentClient({ cookies });

  const { data: recentPatients, error } = await supabase
    .from('Patients')
    .select('created_at, id, first_name, surname, date_of_birth')
    .order('created_at', { ascending: false })
    .limit(10);

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="text-xl">Recent Patients</CardTitle>
        <CardDescription>Your most recently used charts</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-[180px]">Name</TableHead>
              <TableHead className="text-right">Last Seen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentPatients ? (
              recentPatients.map((patient) => {
                const { created_at, id, first_name, surname, date_of_birth } =
                  patient;
                return (
                  <TableRow key={id}>
                    <TableCell className="font-medium">{`${first_name} ${surname}`}</TableCell>

                    <TableCell className="text-right">
                      {new Date(created_at).toDateString()}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <p>Recent patients could not be loaded</p>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
