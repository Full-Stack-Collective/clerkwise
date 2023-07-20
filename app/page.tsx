import Image from 'next/image';
import styles from './page.module.css';
import { PatientHistory } from '../components/PatientHistory';
import { ClinicalExam } from '@/components/ClinicalExam';
import { DiagnosisAndPlan } from '@/components/DiagnosisAndPlan';
import { Vitals } from '@/components/Vitals';
import { RegisterPatient } from '@/components/RegisterPatient';
import Login from '@/components/Login';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Home() {
  const supabase = createServerComponentClient({ cookies });

  return (
    <main className={styles.main}>

    </main>
  );
}
