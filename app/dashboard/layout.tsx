import { DashboardNavigation } from '@/components/DashboardNavigation';
import { Toaster } from '@/components/ui/toaster';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
<<<<<<< HEAD
    <DashboardNavigation className='mb-12' />
=======
    <MainNav className='mb-12 w-full px-4' />
>>>>>>> main
    <section>
      {children}
      <Toaster />
    </section>
    </>
  );
}
