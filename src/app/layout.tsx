import Footer from "@/app/components/footer";
import { CMS_NAME, HOME_OG_IMAGE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";

import "./globals.css";
import { Navbar } from "./components/navbar";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { LightboxProvider } from "./contexts/LightboxContext";
import Lightbox from "./components/lightbox";
import PostImageHandler from "./components/post-image-handler";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `Swisshaus Design & Build ${CMS_NAME}`,
  description: `Custom Home builder in Kalispell, MT ${CMS_NAME}.`,
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: { url: '/favicon/apple-touch-icon.png' },
    other: [
      { rel: 'manifest', url: '/favicon/site.webmanifest' }
    ]
  },
  manifest: '/favicon/site.webmanifest',
  themeColor: '#ff0000',
  openGraph: {
    images: [HOME_OG_IMAGE_URL],
    siteName: 'Swisshaus Design & Build',
    type: 'website'
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/favicon/favicon.svg"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="theme-color" content="#ff0000" />
        <meta name="msapplication-TileColor" content="#ff0000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body
        className={cn(inter.className, "dark:bg-dark-bg dark:text-dark-text")}
      >
        <ThemeContextProvider>
          <LightboxProvider>
            <Navbar />
            <div className="min-h-screen">{children}</div>
            <Footer />
            <PostImageHandler />
            <Lightbox />
          </LightboxProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
