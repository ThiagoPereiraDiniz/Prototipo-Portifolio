import type React from "react"
import { Inter, Cinzel, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import type { Metadata } from "next"
import { PerformanceProvider } from "@/components/PerformanceProvider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const cinzel = Cinzel({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cinzel",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "Imperial Design Archives | Hybrid Portfolio",
  description:
    "A hybrid sci-fi/fantasy portfolio blending Dune-inspired interface mechanics with living document aesthetics",
  keywords: ["portfolio", "design", "sci-fi", "dune", "interactive", "webgl", "3d"],
  authors: [{ name: "Imperial Archives" }],
  openGraph: {
    title: "Imperial Design Archives | Hybrid Portfolio",
    description:
      "A hybrid sci-fi/fantasy portfolio blending Dune-inspired interface mechanics with living document aesthetics",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Imperial Design Archives | Hybrid Portfolio",
    description:
      "A hybrid sci-fi/fantasy portfolio blending Dune-inspired interface mechanics with living document aesthetics",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  themeColor: "#0a192f",
  viewport: "width=device-width, initial-scale=1",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable} ${jetbrainsMono.variable} antialiased`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                      console.log('[v0] ServiceWorker registered:', registration.scope);
                    })
                    .catch(error => {
                      console.log('[v0] ServiceWorker registration failed:', error);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body>
        <div id="metrics-container" aria-hidden="true" />
        <PerformanceProvider>{children}</PerformanceProvider>
      </body>
    </html>
  )
}
