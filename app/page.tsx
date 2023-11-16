import Link from 'next/link';
import styles from './page.module.css';
import { buttonVariants } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="min-h-[70vh] flex items-center">
      <div className="bg-[url('../public/main-bg.jpg')] bg-no-repeat absolute w-full h-full bg-cover z-[-2] top-0 left-0 opacity-10"></div>
      <div className="flex flex-col items-center p-24 gap-3 bg-white bg-opacity-70 rounded-3xl">
        <div className="py-6">
          <h1 className="font-bold text-4xl bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent text-center">
            Patient Management, Simplified
          </h1>
        </div>
        <Link href="/login" className={buttonVariants({ variant: 'outline' })}>
          Go To Physician Login
        </Link>
      </div>
    </main>
  );
}
