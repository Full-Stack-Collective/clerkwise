'use server'

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const signupSupabaseAuthUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const supabase = createServerActionClient<Database>({ cookies });
  const { data } = await supabase.auth.signUp({
    email,
    password,
  });
  return data;
};