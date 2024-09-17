import React from "react";

import {
  PencilSquareIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const CustomerInfo = ({ customer }) => {
  return (
    <tr key={customer.id} className="group">
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        {customer.id}
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        {customer.firstname}
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        {customer.lastname}
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        {customer.email}
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        {customer.phone}
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        {customer.address}
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        {customer.note}
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        <DocumentMagnifyingGlassIcon className="w-6" />
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        <Link href={`/dashboard/customers/${customer.id}`}>
          <PencilSquareIcon className="w-6" />
        </Link>
      </td>
    </tr>
  );
};

export default CustomerInfo;
