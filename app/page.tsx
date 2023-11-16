import Link from 'next/link';
import styles from './page.module.css';
import { buttonVariants } from '@/components/ui/button';
import Image from 'next/image';


export default function Home() {


  return (
    <main className={styles.main}>
      <div className='py-6'>
      <h1 className='font-bold text-4xl bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent text-center'>Patient Management, Simplified</h1>

      </div>
              <Link
          href="/login"
          className={buttonVariants({ variant: 'outline' })}
        >
          Go To Physician Login
        </Link>
        <Image src='/main-bg.jpg' width={500} height={400} alt='Steth and computer' priority={false} className='rounded-3xl h-auto object-contain' quality={50}/>
    </main>
  );
}
