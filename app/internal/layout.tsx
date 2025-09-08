import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Internal Systems - Aromatic Impex Inc.",
  description: "Internal employee systems and tools",
  robots: {
    index: false,
    follow: false,
  },
};

export default function InternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="internal-system">{children}</div>;
}
