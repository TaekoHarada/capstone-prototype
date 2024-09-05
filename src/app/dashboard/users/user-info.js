import React from "react";

import {
  PencilSquareIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const UserInfo = ({ user }) => {
  return (
    <tr key={user.id} className="group">
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        {user.id}
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        {user.name} {/* Updated to use user.name */}
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        {user.email} {/* Updated to use user.email */}
      </td>
      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
        {user.role} {/* Added role field */}
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

export default UserInfo;
