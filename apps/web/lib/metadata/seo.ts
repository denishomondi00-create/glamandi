import type { Metadata } from "next";

export function buildDefaultMetadata(input: { title: string; description: string; path?: string }): Metadata {
  const url = `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}${input.path ?? ""}`;
  return {
    title: input.title,
    description: input.description,
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
    alternates: { canonical: url },
    icons: {
      icon: [
        { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/icons/icon-96.png", sizes: "96x96", type: "image/png" },
        { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
      shortcut: "/favicon.ico",
    },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: "Glamandi Homes",
      images: [{ url: "/logos/glamandi-logo-cropped.png", width: 621, height: 379, alt: "Glamandi Homes" }],
      type: "website",
    },
  };
}
