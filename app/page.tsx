import Image from 'next/image';
import styles from './page.module.css';
import { NewPatient } from './components/NewPatient';

export default function Home() {
  return (
    <main className={styles.main}>
      <NewPatient />
    </main>
  );
}
