import Link from 'next/link';

// <--- UI --->

import { buttonVariants } from '@/components/ui/button';
import RecentPatients from '@/components/RecentPatients';

async function Dashboard() {
  return (
    <div className="max-w-xl w-full p-4 mx-auto">
      <h1 className="text-center font-semibold text-2xl">Dashboard</h1>
      <div className="flex justify-between w-full max-w-sm mx-auto my-10">
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
      <RecentPatients />
    </div>
  );
}

export default Dashboard;
