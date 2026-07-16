import type { Metadata } from "next";
import "./globals.css";
import { ExpenseProvider } from "@/contexts/ExpenseContext";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "PLATITA 💸",
  description: "A simple, modern personal expense tracker.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-background text-foreground">
        <ExpenseProvider>
          <Header />
          <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </main>
        </ExpenseProvider>
      </body>
    </html>
  );
}
