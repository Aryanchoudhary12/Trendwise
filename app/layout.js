"use client"
import "./globals.css";
import Navbar from "./navbar";
import { SessionProvider } from "next-auth/react";
import { Roboto_Condensed,Poppins } from "next/font/google";
import AuthProviders from "./providers/authprovider";
const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["200","400","500","600","700"],
  variable: "--roboto-condensed",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200","400","500","600","700"],
  variable: "--poppins",
});
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${robotoCondensed.variable} ${poppins.variable}`}>
        <AuthProviders>
          <Navbar />
          <main className="pt-16 md:pl-48">{children}</main>
        </AuthProviders>
      </body>
    </html>
  );
}
