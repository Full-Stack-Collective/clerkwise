'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const registerNewProvider = async ({
  id,
  firstName,
  surname,
  email,
  speciality,
  phone,
}: {
  id: string;
  firstName: string;
  surname: string;
  speciality?: string;
  email?: string;
  phone?: string;
}) => {
  const supabase = createServerActionClient<Database>({ cookies });
  try {
    const { data, error } = await supabase.from('Providers').insert({
      id,
      first_name: firstName,
      last_name: surname,
      speciality,
      email,
      phone,
    }).select('*');
    if (error) throw Error(error.message);
    return data;
  } catch (error: any) {
    throw Error('Something went wrong:', error.message);
  }
};
