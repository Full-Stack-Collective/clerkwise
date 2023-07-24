import styles from './page.module.css';
import Link from 'next/link';
import { buttonVariants } from "@/components/ui/button"

export default function Home() {


  return (
    <main className={styles.main}>
      <Link href='/dashboard/new/patient' className={buttonVariants({ variant: 'outline' })}>Create New Patient</Link>
      <Link href='/dashboard/new/exam' className={buttonVariants({ variant: 'outline' })}>New Patient Exam</Link>
    </main>
  );
}
