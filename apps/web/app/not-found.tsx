import Link from "next/link";
import { EmptyState } from "@/components/feedback/empty-state";

export default function NotFound() {
  return (
    <EmptyState
      title="Page not found"
      description="This Glamandi route does not exist or is not available to your portal role."
      action={<Link href="/" className="rounded-2xl bg-[#145F6B] px-5 py-3 text-sm font-black text-white">Return home</Link>}
    />
  );
}
