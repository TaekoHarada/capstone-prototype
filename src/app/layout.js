import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "./_utils/auth-context";

import Head from "next/head"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Punjab Furniture Management System",
  description: "Streamline your furniture business with our comprehensive management system. Efficiently manage inventory, track sales, process orders, and gain valuable insights. Perfect for furniture shops and manufacturers in Punjab.",
  keywords: "furniture management, inventory tracking, sales analytics, Punjab furniture, order processing",
  author: "SAIT group 3 capstone project",
  openGraph: {
    title: "Punjab Furniture Management System",
    description: "Efficient furniture business management solution for Punjab",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <AuthContextProvider>
      <html lang="en" className="h-full">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" /> 
        </Head>
        <body className={`${inter.className} h-full dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
          {children}
        </body>
      </html>
    </AuthContextProvider>
  );
}
