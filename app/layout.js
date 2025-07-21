"use client";
import "./globals.css";
import Navbar from "./navbar";
import { Roboto_Condensed, Poppins,Goldman} from "next/font/google";
import AuthProviders from "./providers/authprovider";
const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["100", "200", "400", "500", "600", "700", "800", "900"],
  variable: "--roboto-condensed",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "400", "500", "600", "700", "800", "900"],
  variable: "--poppins",
});
const goldman = Goldman({
  subsets: ["latin"],
  weight: [ "400", "700"],
  variable: "--goldman",
});
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${robotoCondensed.variable} ${poppins.variable} ${goldman.variable}`}>
        <AuthProviders>
          <Navbar />
          <main className="pt-16 md:pl-48">{children}</main>
        </AuthProviders>
      </body>
    </html>
  );
}
