import Link from 'next/link';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
// <--- UI --->

import { buttonVariants } from '@/components/ui/button';

async function Dashboard() {

  const supabase = createServerComponentClient( { cookies })
  const { data: {session }} = await supabase.auth.getSession()

  if(!session){
    redirect('/login')
  }


  return (
    <div className="max-w-xl w-full p-4 mx-auto">
      <h1 className='text-center font-semibold'>Dashboard</h1>
      <div className='flex justify-between w-full max-w-sm mx-auto my-10'>
        <Link
          href="/dashboard/new/patient"
          className={buttonVariants({ variant: 'outline' })}
        >
          Create New Patient
        </Link>
        <Link
          href="/dashboard/new/exam"
          className={buttonVariants({ variant: 'outline' })}
        >
          New Patient Exam
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
