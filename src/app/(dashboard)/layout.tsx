"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import LoadingScreen from "@/components/common/loading-screen";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      setLoading(false);
    }
  }, [status, router]);

  if (loading || status === "loading") {
    return <LoadingScreen />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        userRole={session?.user?.role || "SUB_USER"}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <Header
          onMenuButtonClick={() => setSidebarOpen(true)}
          user={session?.user}
        />
        <main className="relative flex-1 overflow-y-auto focus:outline-none p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
