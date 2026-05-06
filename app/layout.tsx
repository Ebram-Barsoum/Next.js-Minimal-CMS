import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/shared/ui/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body className="h-screen grid grid-rows-[auto_1fr]">
        <Header />

        <main className="min-h-full bg-gray-100 text-black p-4 overflow-auto  md:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
