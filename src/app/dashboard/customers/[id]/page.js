"use client";

import { useRouter } from "next/navigation";
import CustomerDetail from "./customer-detail";

export default function Page({ params }) {
  const router = useRouter();
  const { id } = params; // params are passed as props in the new app router

  return (
    <main>
      <CustomerDetail id={id} />
    </main>
  );
}
