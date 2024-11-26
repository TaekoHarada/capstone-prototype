"use client";

import { useRouter } from "next/navigation";
import CustomerDetail from "./customer-detail";

export default function Page({ params }) {
  const router = useRouter();
  const { id } = params;

  return (
    <main>
      <CustomerDetail id={id} />
    </main>
  );
}