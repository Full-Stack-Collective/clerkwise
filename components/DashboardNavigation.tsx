'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import LogoutButton from './LogoutButton';
import { useProviderStore } from '@/stores/currentProviderStore';

export function DashboardNavigation({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const setUserInfo = useProviderStore((state) => state.setProviderInfo);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    localStorage.clear();
    router.refresh();
  };
  return (
    <nav className="flex items-start justify-between w-full" {...props}>
      <div
        className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      >
        <Link
          href="/dashboard"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          Dashboard
        </Link>
        <Link
          href="/dashboard"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Patients
        </Link>
        <Link
          href="/dashboard"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Appointments
        </Link>
        <Link
          href="/dashboard"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Settings
        </Link>
      </div>
      <LogoutButton handleSignOut={handleSignOut} />
    </nav>
  );
}
