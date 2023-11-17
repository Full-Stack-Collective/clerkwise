export const revalidate = 0

import Link from 'next/link';
import RecentPatients from '@/components/RecentPatients';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
// <--- UI --->

import { buttonVariants } from '@/components/ui/button';

async function Dashboard() {

  const supabase = createServerComponentClient({ cookies });

  const { data: recentPatients, error } = await supabase
    .from('Patients')
    .select('accessed_at, id, first_name, surname, date_of_birth')
    .order('accessed_at', { ascending: false })
    .limit(8);

  return (
    <div className="max-w-xl w-full p-4 mx-auto">
      <h1 className="text-center font-semibold text-2xl">Dashboard</h1>
      <div className="flex justify-center w-full max-w-sm mx-auto my-10">
        <Link
          href="/dashboard/new/patient"
          className={buttonVariants({ variant: 'outline' })}
        >
          Create New Patient
        </Link>
      </div>
      <RecentPatients recentPatients={recentPatients}/>
    </div>
  );
}

export default Dashboard;
