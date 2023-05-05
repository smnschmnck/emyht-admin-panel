import Image from "next/image";
import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "emyht admin console",
  description: "Admin console for emyht",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-50`}>
        <nav className="flex px-16 py-4 border-b border-zinc-200">
          <Link href="/">
            <Image
              width={100}
              height={34}
              alt="emyht logo"
              src={"https://cdn.emyht.com/emyht-logo.svg"}
            />
          </Link>
        </nav>
        <main className="px-16 py-10">{children}</main>
      </body>
    </html>
  );
}
