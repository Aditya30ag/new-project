"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/common/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <div className="space-y-6 max-w-md">
        <h1 className="text-4xl font-bold">Something went wrong</h1>
        <p className="text-muted-foreground">
          {error.message || "An unexpected error occurred"}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset}>Try again</Button>
          <Button variant="outline" asChild>
            <Link href="/login">Return to login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}


