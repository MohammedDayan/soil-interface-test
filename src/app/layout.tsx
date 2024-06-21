import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {NextUIProvider} from "@nextui-org/react";
import { Providers } from "./provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Soil Interface Interaction",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
     
     <html lang="en">
      <body className={inter.className}>
        <Providers>
        {children}
        </Providers>
        
        
        </body>
    </html>
     
    
    </>
    
  );
}
