import React from "react";

import {
  PencilSquareIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const OrderInfo = ({ order }) => {
  return (
    <tr key={order.id} className="group">
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        {order.id}
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        {order.customerName}
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        {new Date(order.orderDate).toLocaleDateString()}
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        ${order.totalAmount.toFixed(2)}
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        {order.status}
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        {order.note}
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        <DocumentMagnifyingGlassIcon className="w-6" />
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        <PencilSquareIcon className="w-6" />
      </td>
    </tr>
  );
};

export default OrderInfo;
