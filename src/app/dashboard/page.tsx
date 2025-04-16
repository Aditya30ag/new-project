"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/common/loading-screen";

export default function DashboardRedirectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated" && session.user) {
      const role = session.user.role;
      
      if (role === "SUPER_ADMIN") {
        router.push("/super-admin/dashboard");
      } else if (role === "UNIVERSITY_ADMIN") {
        router.push("/university-admin/dashboard");
      } else if (role === "SUB_USER") {
        router.push("/sub-user/dashboard");
      } else {
        // Fallback
        router.push("/login");
      }
    }
  }, [status, session, router]);

  return <LoadingScreen />;
}

