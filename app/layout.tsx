import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./components/Providers";
import Header from "./components/Header";
import { NotificationProvider } from "./components/Notification";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ImageKit Next.js Integration",
  description: "Demo of ImageKit integration with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-gradient-to-br from-[#18181b] via-[#23232b] to-[#232323] min-h-screen flex flex-col relative overflow-x-hidden"}>
        {/* Glassmorphism background effect */}
        <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-transparent blur-2xl opacity-80" />
        <NotificationProvider>
          <Providers>
            <Header />
            <main className="flex-1 flex flex-col items-center justify-start w-full max-w-5xl mx-auto px-4 py-12 z-10">
              <div className="w-full rounded-2xl bg-white/5 backdrop-blur-md shadow-2xl border border-white/10 p-6 md:p-10 min-h-[60vh] flex flex-col items-center">
                {children}
              </div>
            </main>
          </Providers>
        </NotificationProvider>
      </body>
    </html>
  );
}
