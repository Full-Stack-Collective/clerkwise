import { DashboardNavigation } from '@/components/DashboardNavigation';
import { Toaster } from '@/components/ui/toaster';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <DashboardNavigation className='mb-12' />
    <section>
      {children}
      <Toaster />
    </section>
    </>
  );
}
