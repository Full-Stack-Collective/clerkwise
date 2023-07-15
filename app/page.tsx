import { NewPatient } from '@/components/NewPatient';

export default function Home() {

  const createPatient =async (data:FormData) => {
    'use server'
    console.log(data)
  }

  return (
    <main>
      <NewPatient />
    </main>
  );
}
