import type { ReactNode } from "react";

interface SectionLayoutProps {
  children: ReactNode;
}
export const SectionLayout: React.FC<SectionLayoutProps> = ({ children }) => {
  return <section className="h-full p-12 overflow-auto">{children}</section>;
};
