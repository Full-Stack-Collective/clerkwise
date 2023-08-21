import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { columns } from './columns';
import { DataTable } from './data-table';

async function getAllPatients() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.from('Patients').select().order('surname', {ascending: true});
  return data;
}

export default async function DemoPage() {
  const data = await getAllPatients();

  return (
    <div className="container mx-auto py-10 min-w-[600px]">
      {data && <DataTable columns={columns} data={data} />}
    </div>
  );
}
