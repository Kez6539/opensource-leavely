import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { CookieConsent, PostHogProvider, PreSaleChatWidget } from "@/components/shared";
import {
  SITE_URL,
  SITE_NAME,
  PRIMARY_KEYWORDS,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_DESCRIPTION,
} from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  manifest: '/manifest.json',
  title: {
    default:
      "Leavely — Leave Management Software for UK Businesses | Holiday & Absence Tracker",
    template: "%s | Leavely",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: PRIMARY_KEYWORDS,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en-GB': SITE_URL,
    },
  },
  openGraph: {
    title:
      "Leavely — Leave Management Software for UK Businesses",
    description: DEFAULT_OG_DESCRIPTION,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Leavely — Leave Management Software for UK Teams",
    description: DEFAULT_OG_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Business Software",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Leavely",
  },
  icons: {
    // No ICO file in the repo, so point every favicon variant at the PWA
    // PNG that does exist. Stops Chrome from 404-ing /favicon.ico on every
    // visit and gives SERP results a real glyph instead of the globe.
    icon: '/icons/icon-192.png',
    shortcut: '/icons/icon-192.png',
    apple: '/icons/icon-192.png',
  },
  other: {
    'application/rss+xml': `${SITE_URL}/blog/feed.xml`,
    'theme-color': '#059669',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PostHogProvider>
          {children}
        </PostHogProvider>
        <Toaster richColors position="top-right" />
        <CookieConsent />
        <PreSaleChatWidget />
      </body>
    </html>
  );
}
