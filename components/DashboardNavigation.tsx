'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import LogoutButton from './LogoutButton';
import { useProviderStore } from '@/stores/currentProviderStore';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function DashboardNavigation({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const providerStore = useProviderStore();


  const { providerFirstName, providerLastName } = providerStore

  const providerInitials = providerFirstName[0] + providerLastName[0]

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  return (
    <div className="w-full">
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
            href="/dashboard/patients"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Patients
          </Link>
          <Link
            href="/dashboard/appointments"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Appointments
          </Link>
          {/* <Link
          href="/dashboard"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Settings
        </Link> */}
        </div>
        <div className="flex flex-col items-end gap-3">
          <LogoutButton handleSignOut={handleSignOut} />
          <div className="flex items-center justify-end">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>
                {providerInitials}
              </AvatarFallback>
            </Avatar>
            <p className="font-light text-xs">
              Dr. {providerFirstName} {providerLastName}
            </p>
          </div>
        </div>
      </nav>
    </div>
  );
}
