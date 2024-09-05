"use client";

import React, { useState, useEffect } from "react";
import User from "/src/app/models/User"; // Update import to User model
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from 'next/link';

const UserList = () => {
  const [users, setUsers] = useState([]); // Change orders to users
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await User.findAll(); // Fetch users instead of orders
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchClick = async () => {
    const userId = document.getElementById("user-id").value.trim(); // Change to user-id
    if (!userId) {
      setError("Please enter a user ID.");
      return;
    }
    try {
      const results = await User.findById(userId); // Fetch user by ID
      setUsers(results ? [results] : []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error fetching users.");
    }
  };

  return (
    <div>
      <h1 className="font-bold">User Management {" > "} User List</h1>
      <div className="flex justify-between items-center my-4">
        <div className="search-form flex items-center flex-1">
          <div className="relative flex flex-1 flex-shrink-0">
            <input
              id="user-id" // Change input ID
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              placeholder="User ID" // Change placeholder
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <button
            onClick={handleSearchClick}
            className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded ml-3"
          >
            Search
          </button>
        </div>
        <Link href="/dashboard/users/new" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded ml-4">
          Add New User
        </Link>
      </div>
      {error && <div className="text-red-500">{error}</div>}{" "}
      <table className="hidden min-w-full text-gray-900 md:table">
        <thead className="bg-gray-100 text-left text-sm font-normal">
          <tr>
            <th scope="col" className="px-3 py-3 font-medium">
              User ID
            </th>
            <th scope="col" className="px-3 py-3 font-medium">
              Name
            </th>
            <th scope="col" className="px-3 py-3 font-medium">
              Email
            </th>
            <th scope="col" className="px-3 py-3 font-medium">
              Role
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              {" "}
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              {" "}
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 text-gray-900">
          {users.map((user) => (
            <tr key={user.id} className="group">
              <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                {user.id}
              </td>
              <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                {user.name} {/* Change to user.name */}
              </td>
              <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                {user.email}
              </td>
              <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                {user.role} {/* Change to user.role */}
              </td>
              <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                <Link href={`/dashboard/users/edit/${user.id}`}>
                  <PencilSquareIcon className="w-6" />
                </Link>
              </td>
              <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                <DocumentMagnifyingGlassIcon className="w-6" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;