import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Harukit - Modern React UI Components",
  description: "A modern, accessible, and customizable UI component library built with React, TypeScript, and Tailwind CSS.",
  keywords: ["react", "typescript", "tailwind", "ui", "components", "design-system"],
  authors: [{ name: "Harukit Team" }],
  creator: "Harukit Team",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://harukit.dev",
    title: "Harukit - Modern React UI Components",
    description: "A modern, accessible, and customizable UI component library built with React, TypeScript, and Tailwind CSS.",
    siteName: "Harukit",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harukit - Modern React UI Components",
    description: "A modern, accessible, and customizable UI component library built with React, TypeScript, and Tailwind CSS.",
    creator: "@harukit",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
} 