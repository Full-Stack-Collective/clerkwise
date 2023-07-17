import Image from 'next/image';
import styles from './page.module.css';
import { PatientHistory } from '../components/PatientHistory';
import { ClinicalExam } from '@/components/ClinicalExam';
import { DiagnosisAndPlan } from '@/components/DiagnosisAndPlan';
import { Vitals } from '@/components/Vitals';
import { RegisterPatient } from '@/components/RegisterPatient';

export default function Home() {
  return (
    <main className={styles.main}>
    <RegisterPatient />
    </main>
  );
}
