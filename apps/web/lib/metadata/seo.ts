import type { Metadata } from "next";

export function buildDefaultMetadata(input: { title: string; description: string; path?: string }): Metadata {
  const url = `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}${input.path ?? ""}`;
  return {
    title: input.title,
    description: input.description,
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
    alternates: { canonical: url },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: "Glamandi Homes",
      images: [{ url: "/logos/glamandi-logo.jpeg", width: 1200, height: 630, alt: "Glamandi Homes" }],
      type: "website",
    },
  };
}
