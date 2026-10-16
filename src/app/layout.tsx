import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Rogue Code — Software studio & coding academy",
    template: "%s",
  },
  description:
    "Rogue Code builds web and mobile software for businesses and trains developers at Rogue Academy. We code. We compile. We run.",
};

export const viewport: Viewport = {
  themeColor: "#05073A",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} ${jetbrainsMono.variable} antialiased`}>
      <body>
        <div className="relative min-h-screen bg-ink text-paper">{children}</div>
      </body>
    </html>
  );
}
