import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'NarratorHQ — Client Reporting Automation for Agencies',
    template: '%s | NarratorHQ',
  },
  description: 'NarratorHQ automates client performance reports for digital marketing agencies. Connect GA4, Google Ads, and Meta. Get a polished narrative in minutes, not hours.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://narratorhq.com'),
  openGraph: {
    type: 'website',
    siteName: 'NarratorHQ',
    title: 'NarratorHQ — Client Reporting Automation for Agencies',
    description: 'Stop spending 20 hours a month writing client reports. NarratorHQ connects to GA4, Google Ads, and Meta and writes the narrative automatically.',
    url: process.env.NEXT_PUBLIC_APP_URL ?? 'https://narratorhq.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NarratorHQ — Client Reporting Automation for Agencies',
    description: 'Stop spending 20 hours a month writing client reports. NarratorHQ connects to GA4, Google Ads, and Meta and writes the narrative automatically.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
