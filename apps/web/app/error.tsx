"use client";

import { ErrorState } from "@/components/feedback/error-state";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <ErrorState
      title="Something needs attention"
      description={error.message || "The page could not load. Try again or check the API connection."}
      actionLabel="Try again"
      onAction={reset}
    />
  );
}
