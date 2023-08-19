import Link from 'next/link';
import RecentPatients from '@/components/RecentPatients';

// <--- UI --->

import { buttonVariants } from '@/components/ui/button';

async function Dashboard() {


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
      <RecentPatients/>
    </div>
  );
}

export default Dashboard;
