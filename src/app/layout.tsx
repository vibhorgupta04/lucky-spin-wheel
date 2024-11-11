import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Lucky Spin Wheel",
  description:
    "Lucky Spin Wheel is a fun and interactive spin-to-win game that lets users experience the thrill of a casino right from their device. Built with a responsive design, confetti animations, and celebratory sound effects, the Lucky Spin Wheel is perfect for gamifying promotions, rewards, or any project that needs a touch of excitement. Users can spin the wheel to win casino-themed prizes like mini slot machines, casino chips, and jackpots. The game is powered by React and customizable to suit various themes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
