import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: "Rafi Ahmed — Visual Designer",
  description: "Portfolio of Rafi Ahmed — Brand Identity, Typography & Illustration",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={dmSans.className}>{children}</body>
    </html>
  );
}
