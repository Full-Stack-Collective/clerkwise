'use client'

import { useUserStore } from "@/stores/userStore";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {

  const { userInfo } = useUserStore();
  console.log(userInfo)

  return (
      <section>
        {children}
      </section>
  );
}
