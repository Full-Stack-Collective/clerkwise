import Image from 'next/image';
import styles from './page.module.css';
import { PatientHistory } from '../components/PatientHistory';
import { ClinicalExam } from '@/components/ClinicalExam';
import { DiagnosisAndPlan } from '@/components/DiagnosisAndPlan';
import { Vitals } from '@/components/Vitals';

export default function Home() {
  return (
    <main className={styles.main}>
      {/* <h2>Patient Information</h2>
      <form className={styles.form}>
        <label htmlFor="firstname">
          First Name: <input type="text" name="firstName" id="first Name" />
        </label>

        <label htmlFor="surname">
          Surname: <input type="text" name="surname" id="surname" />
        </label>

        <fieldset>
          <legend>Sex: </legend>
          <label htmlFor="female">Female</label>
          <input type="radio" name="sex" id="female" />
          <label htmlFor="male">Male</label>
          <input type="radio" name="sex" id="male" />
        </fieldset>

        <label htmlFor="dob">
          Date of Birth: <input type="date" name="dob" id="dob" />
        </label>

        <label htmlFor="id">
          ID: <input type="text" name="id" id="id" />
        </label>

        <label htmlFor="phone">
          Phone: <input type="tel" name="phone" id="phone" />
        </label>

        <label htmlFor="address">
          Address: <input type="text" name="address" id="address" />
        </label>
        <button type="submit">Submit</button>
      </form> */}

      {/* <PatientHistory /> */}
      <ClinicalExam />
      <Vitals />
      {/* <DiagnosisAndPlan /> */}
    </main>
  );
}
