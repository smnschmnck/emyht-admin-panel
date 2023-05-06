import Image from "next/image";
import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { ClerkProvider, UserButton } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "emyht | Admin panel",
  description: "Admin panel for emyht",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-white`}>
          <nav className="flex justify-between px-16 py-6 border-b border-zinc-200">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Image
                  width={100}
                  height={34}
                  alt="emyht logo"
                  src={"https://cdn.emyht.com/emyht-logo.svg"}
                />
              </Link>
              <span className="text-xl font-extralight text-zinc-500">|</span>
              <h1 className="font-medium">Admin panel</h1>
            </div>
            <UserButton />
          </nav>
          <main className="px-16 py-8">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
