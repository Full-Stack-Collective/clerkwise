import { MainNav } from '@/components/ui/main-nav';
import { Toaster } from '@/components/ui/toaster';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <MainNav className='mb-12 w-full px-4' />
    <section>
      {children}
      <Toaster />
    </section>
    </>
  );
}
