import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { DashboardNavigation } from '@/components/DashboardNavigation';
import { Toaster } from '@/components/ui/toaster';
import { useProviderStore } from '@/stores/currentProviderStore';
import StoreInitialiser from '@/components/StoreInitialiser';

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

  const { data } = await supabase
    .from('Providers')
    .select('id, practice, first_name, last_name');

  const [{ id, practice, first_name, last_name }] = data as Provider[];

  if (id && practice && first_name && last_name)
    useProviderStore.setState({
      practiceId: practice,
      providerFirstName: first_name,
      providerLastName: last_name,
      providerId: id,
    });

  return (
    <>
      <StoreInitialiser
        practiceId={practice as string}
        providerFirstName={first_name as string}
        providerLastName={last_name as string}
        providerId={id}
      />
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
