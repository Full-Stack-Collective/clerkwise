'use client';

import { UserContextProvider } from '@/contexts/userContext';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <UserContextProvider>
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        <nav></nav>

        {children}
      </section>
    </UserContextProvider>
  );
}
