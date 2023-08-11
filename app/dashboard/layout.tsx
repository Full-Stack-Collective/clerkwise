import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';


import { DashboardNavigation } from '@/components/DashboardNavigation';
import { Toaster } from '@/components/ui/toaster';
import LogoutButton from '@/components/LogoutButton';

export default async function DashboardLayout({
  children, 
}: {
  children: React.ReactNode;
}) {



  return (
    <>
    <div className='flex justify-between'>
    <DashboardNavigation className='mb-12' />

    </div>
    <section>
      {children}
      <Toaster />
    </section>
    </>
  );
}
