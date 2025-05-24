import type { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className="h-screen flex justify-center items-center bg-gray-100">
      {children}
    </main>
  );
}
