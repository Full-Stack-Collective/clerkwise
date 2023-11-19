export const revalidate = 0;

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { AdminCompleteSignup } from '@/components/AdminCompleteSignup';
import React from 'react';
import { redirect } from 'next/navigation';

const supabase = createServerComponentClient({ cookies });

export default async function Page() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const userId = session?.user.id;

  const { data: currentUser } = await supabase
    .from('Providers')
    .select('*')
    .eq('id', userId);

  const currentUserExists = currentUser && currentUser?.length > 0;

  if (currentUserExists) redirect('/dashboard');

  return (
    <div className="py-4">
      <div className="py-6">
        <h1 className="font-semibold text-center text-5xl leading-snug text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 w-full tracking-tighter">
          Hey Doc,
        </h1>

        <p className="font-semibold text-center text-xl">
          just a few more details to set up your account:
        </p>
      </div>
      <AdminCompleteSignup userId={userId as string} />
    </div>
  );
}
