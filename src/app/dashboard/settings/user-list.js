"use client";

import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from 'next/link';

// Dummy data
const dummyUsers = [
  {
    id: "1",
    username: "john_doe",
    email: "john@example.com",
    role: "Admin",
    createdAt: "2023-01-15T00:00:00.000Z"
  },
  {
    id: "2",
    username: "jane_smith",
    email: "jane@example.com",
    role: "User",
    createdAt: "2023-03-20T00:00:00.000Z"
  }
];

const UserList = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [error, setError] = useState("");

  const handleSearchClick = () => {
    const username = document.getElementById("username").value.trim();
    if (!username) {
      setError("Please enter a username.");
      return;
    }
    const filteredUsers = dummyUsers.filter(user => 
      user.username.toLowerCase().includes(username.toLowerCase())
    );
    setUsers(filteredUsers);
    setError("");
  };

  return (
    <div>
      <h1 className="font-bold">User Management {" > "} User List</h1>
      <div className="search-form flex justify-between items-center my-4">
        <div className="relative flex flex-1 flex-shrink-0">
          <input
            id="username"
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Username"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
        <div>
          <button
            onClick={handleSearchClick}
            className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded ml-3"
          >
            Search
          </button>
        </div>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <table className="min-w-full divide-y divide-gray-200 text-gray-900">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6">
                      Username
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
                      Role
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold">
                      Created At
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
                        {user.username}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">{user.email}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">{user.role}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link href={`/dashboard/settings/${user.id}`} className="text-blue-600 hover:text-blue-900">
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
