"use client";

import { useRouter } from "next/navigation";
import OrderDetail from "./order-detail";

export default function Page({ params }) {
  const router = useRouter();
  const { id } = params;

  return (
    <main>
      <OrderDetail id={id} />
    </main>
  );
}
