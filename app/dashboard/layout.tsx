import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { DashboardNavigation } from '@/components/DashboardNavigation';
import { Toaster } from '@/components/ui/toaster';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }


  return (
    <>
      <div className="flex justify-between">
        <DashboardNavigation className="mb-12" />
      </div>
      <section>
        {children}
        <Toaster />
      </section>
    </>
  );
}
