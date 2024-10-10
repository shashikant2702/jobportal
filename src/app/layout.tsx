import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import VerticalNavbar from "./components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Job Portal",
  description: "Welcome to the Job Portal application",
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
        <div className="flex min-h-screen">
          {/* Vertical Navbar */}
          <aside className="w-1/4 bg-gray-800 text-white">
            <VerticalNavbar userRole="company" />
          </aside>

          {/* Main content */}
          <main className="flex-1 p-8 bg-gray-100 ml-1/4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
