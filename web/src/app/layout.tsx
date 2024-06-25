import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "@axlotl-lab/react-toolkit"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>

        <div className="flex min-h-screen flex-col p-14">
          <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            @axlotl-lab/react-toolkit
          </p>

          <div className="flex space-x-4 py-4 font-mono">
            <Link href="/components" className="text-lg font-medium text-blue-600 hover:text-blue-800">Components</Link>
            <Link href="/hooks" className="text-lg font-medium text-blue-600 hover:text-blue-800">Hooks</Link>
          </div>

          {children}
        </div>
      </body>
    </html>
  );
}
