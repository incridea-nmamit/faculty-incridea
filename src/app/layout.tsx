import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "~/components/ui/sonner";
import Navbar from "./_components/navbar";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Faculty | Incridea",
  description: "Faculty portal for Incridea",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Toaster />
        <SessionProvider>
          <TRPCReactProvider>
            <Navbar />
            <div className="flex min-h-screen w-screen flex-col bg-gradient-to-b from-emerald-950 to-emerald-800">
              {children}
            </div>
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
