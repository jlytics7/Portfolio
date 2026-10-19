import type { Metadata, Viewport } from "next";
import { Archivo_Black, Inter, JetBrains_Mono, Sora } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { BackToTop } from "@/components/layout/back-to-top";
import { MotionProvider } from "@/components/providers/motion-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { personJsonLd, websiteJsonLd } from "@/lib/seo";
import { profile } from "@/data/profile";
import { siteConfig } from "@/data/site";

import "./globals.css";

/* --------------------------------------------------------------------------
   Fonts

   Three families, each with a distinct job:
     Sora           — display, headings, the hero name
     Inter          — body copy, UI text
     JetBrains Mono — overlines, tech tags, status chips, numerals
   Self-hosted by next/font, so there is no request to Google at runtime.
   -------------------------------------------------------------------------- */

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Single weight, so this costs one small file. Sora tops out at 800 and stays
 * fairly wide — the hero wants a face that is genuinely heavy at a very large
 * size. Used for the hero name and nothing else.
 */
const archivoBlack = Archivo_Black({
  variable: "--font-archivo",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

/* --------------------------------------------------------------------------
   Metadata
   -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${profile.fullName}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: profile.fullName }],
  creator: profile.fullName,
  applicationName: `${profile.fullName} Portfolio`,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.shortDescription,
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: siteConfig.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.shortDescription,
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fffcf2" },
    { media: "(prefers-color-scheme: dark)", color: "#252422" },
  ],
};

/* --------------------------------------------------------------------------
   Pre-paint theme resolution

   Runs synchronously in <head>, before the browser paints anything, so the
   correct theme is on <html> from the very first frame. The try/catch covers
   browsers where localStorage is blocked (private mode, hardened settings).
   -------------------------------------------------------------------------- */

const themeScript = `(function(){try{
var stored=localStorage.getItem("theme");
var theme=(stored==="light"||stored==="dark")?stored:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");
document.documentElement.setAttribute("data-theme",theme);
}catch(e){document.documentElement.setAttribute("data-theme","light")}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // The inline script mutates this attribute before hydration.
      suppressHydrationWarning
      // Tells Next.js to override smooth scrolling during route transitions,
      // so client-side navigation stays snappy while anchors stay smooth.
      data-scroll-behavior="smooth"
      className={`${sora.variable} ${archivoBlack.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Without JavaScript the scroll-reveal wrappers would stay invisible. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          // Structured data so search engines understand who this page is about.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personJsonLd(), websiteJsonLd()]),
          }}
        />
      </head>
      <body className="bg-canvas text-ink font-sans antialiased">
        <ThemeProvider>
          <MotionProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-accent-solid focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-accent-fg"
            >
              Skip to content
            </a>

            <ScrollProgress />
            <Navbar />

            <main id="main" className="flex-1">
              {children}
            </main>

            <Footer />
            <BackToTop />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
