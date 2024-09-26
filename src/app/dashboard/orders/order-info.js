import React from "react";

import {
  PencilSquareIcon,
  DocumentCurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const OrderInfo = ({ order }) => {
  return (
    <tr key={order.id} className="group">
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        {order.id}
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        {order.status}
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        {order.customerId}
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        {order.orderItemId}
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        {order.shippingType}
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        {order.orderDate}
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        {order.deliverDate}
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        {order.paymentDate}
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        {order.paymentMethod}
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm text-right">
        {order.totalAmount}
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm text-right">
        {order.paidBalance}
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm text-right">
        {order.totalAmount - order.paidBalance}
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm flex justify-center items-center">
        <Link href={`/dashboard/orders/${order.id}`}>
          <DocumentCurrencyDollarIcon className="w-6" />
        </Link>
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        <Link href={`/dashboard/orders/${order.id}`}>
          <PencilSquareIcon className="w-6" />
        </Link>
      </td>
    </tr>
  );
};

export default OrderInfo;
