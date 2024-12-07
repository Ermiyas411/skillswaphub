import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "SkillSwap Hub",
  description: "SkillSwap Hub is a platform for learning and sharing skills",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={`antialiased`}>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen">
        {children}
      </div>
    </main>
  );
}
