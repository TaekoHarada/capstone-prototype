import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "./_utils/auth-context";

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
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </AuthContextProvider>
  );
}