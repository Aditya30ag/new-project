"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoadingScreen from "@/components/common/loading-screen";

export default function HomePage() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "authenticated") {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [status, router]);

  return <LoadingScreen />;
}

