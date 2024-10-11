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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="lg:w-1/4 bg-gray-800 text-white fixed top-0 left-0 h-screen hidden lg:block">
            <VerticalNavbar />
          </aside>

          {/* Main content */}
          <main className="flex-1 lg:ml-[25%] p-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
