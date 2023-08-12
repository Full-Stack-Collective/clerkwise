import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Clerkwise: Simplified Patient Management',
  description: 'The patient management app to streamline clerking',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className='py-3 px-4'>
          <h2 className='font-semibold text-lg bg-gradient-to-br from-cyan-500 to-blue-900 bg-clip-text text-transparent'>Clerkwise</h2>
        </header>
        <main className='max-w-3xl w-full sm:px-4 px-2 mx-auto'>

        {children}
        </main>
        <footer className='w-full p-4 pt-16 '>
          <p className='text-center'>&copy; {new Date().getFullYear()} Full Stack Collective </p>
        </footer>
      </body>
    </html>
  );
}
