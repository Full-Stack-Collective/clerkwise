import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { DashboardNavigation } from '@/components/DashboardNavigation';
import { useProviderStore } from '@/stores/currentProviderStore';
import ProviderStoreInitialiser from '@/components/ProviderStoreInitialiser';

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

  const { data: currentUser, error } = await supabase
    .from('Providers')
    .select('id, practice, first_name, last_name');

  if (currentUser?.length === 0) {
    redirect('/register/complete');
  }
  

  const [{ id, practice, first_name, last_name }] = currentUser as Provider[];

  if (id && practice && first_name && last_name)
    useProviderStore.setState({
      practiceId: practice,
      providerFirstName: first_name,
      providerLastName: last_name,
      providerId: id,
    });

  return (
    <>
      <ProviderStoreInitialiser
        practiceId={practice as string}
        providerFirstName={first_name as string}
        providerLastName={last_name as string}
        providerId={id}
      />
      <div className="flex justify-between">
        <DashboardNavigation className="mb-12" />
      </div>
      <section>{children}</section>
    </>
  );
}
