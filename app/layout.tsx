import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abdullah Al Forkan | Software, AI & Engineering",
  description:
    "Portfolio of Abdullah Al Forkan — software development, AI and machine learning, mobile apps, engineering research, and games.",
  openGraph: {
    title: "Abdullah Al Forkan | Portfolio",
    description: "Software engineering, AI, autonomous systems and creative projects.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
