import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/ThemeProvider"; // নতুন ইম্পোর্ট

export const metadata: Metadata = {
  title: "StudioSpace | Peer-to-Peer Creative Workspace",
  description: "Discover, book, and host premium creative studios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <AuthProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <Toaster position="top-center" toastOptions={{
              style: { background: '#18181b', color: '#f4f4f5', border: '1px solid #27272a' }
            }} />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}