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
  title: "Cognetex - AI Development & Full Stack Solutions | Code It. Scale It. Nail It.",
  description: "Transform your business with cutting-edge AI, machine learning, and full-stack development solutions. Cognetex delivers scalable, intelligent software that drives results.",
  keywords: [
    "AI development",
    "machine learning",
    "full stack development",
    "artificial intelligence",
    "software development",
    "Next.js",
    "React",
    "Python",
    "automation",
    "Cognetex"
  ],
  authors: [{ name: "Cognetex Team" }],
  creator: "Cognetex",
  publisher: "Cognetex",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://cognetex.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Cognetex - AI Development & Full Stack Solutions",
    description: "Transform your business with cutting-edge AI, machine learning, and full-stack development solutions.",
    url: 'https://cognetex.vercel.app',
    siteName: 'Cognetex',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cognetex - AI Development & Full Stack Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Cognetex - AI Development & Full Stack Solutions",
    description: "Transform your business with cutting-edge AI, machine learning, and full-stack development solutions.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
