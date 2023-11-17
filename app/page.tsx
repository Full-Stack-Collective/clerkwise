import Link from 'next/link';
import styles from './page.module.css';
import { buttonVariants } from '@/components/ui/button';
import Image from 'next/image';


export default function Home() {


  return (
    <main className={styles.main}>
      <div className='py-6'>
        <div className='bg-white p-5 rounded-2xl bg-opacity-70'>
      <h1 className='font-bold text-4xl bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent text-center'>Patient Management, Simplified</h1>

        </div>

      </div>
              <Link
          href="/login"
          className={buttonVariants({ variant: 'outline' })}
        >
          Go To Physician Login
        </Link>

    </main>
  );
}
