import "./globals.css";
// FONT: "Roboto Slab" from Google Fonts (https://fonts.google.com/specimen/Roboto+Slab).
// Museo Slab (the font used on ughe.org) is a paid font only on Adobe Fonts/MyFonts,
// so I used Roboto Slab, which the task lists as an allowed alternative.
// It is loaded with Next.js "next/font/google", which downloads it at build time.
import { Roboto_Slab } from "next/font/google";

// Load the font and expose it as a CSS variable (--font-slab) used in globals.css
const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-slab",
});

// Browser tab title
export const metadata = {
  title: "UGHE Test Web App",
  description: "UGHE Test Web App - Next.js frontend with a Django backend",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={robotoSlab.variable}>
      <body>{children}</body>
    </html>
  );
}
