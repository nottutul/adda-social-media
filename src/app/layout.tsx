import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar02Page from "@/components/navbar-02/navbar-02";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adda",
  description: "Adda Social Media App",
};
 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col"> 
        <ClerkProvider>
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem 
              disableTransitionOnChange
            >
          
          <div className="sticky top-0 z-10">
            <Navbar02Page/>
          </div>
          

          <div>{children}</div>
            
          <Toaster position="top-center" richColors/>
          </ThemeProvider>
        </ClerkProvider>
         
      </body>
    </html>
  );
}
