"use client";

import React, { useState, useEffect } from "react";
import CustomerInfo from "./customer-info";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Customer from "/src/app/models/Customer";
import Link from "next/link";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await Customer.findAll();
        // Sort customers alphabetically by firstname
        const sortedData = data.sort((a, b) => a.firstname.localeCompare(b.firstname));
        setCustomers(sortedData);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, []);

  const handleSearchClick = async () => {
    const name = document.getElementById("customer-name").value.trim();
    if (!name) {
      setError("Please enter a customer name.");
      return;
    }
    try {
      const results = await Customer.findByFirstName(name);
      // Sort search results alphabetically by firstname
      const sortedResults = results.sort((a, b) => a.firstname.localeCompare(b.firstname));
      setCustomers(sortedResults);
      setError("");
    } catch (err) {
      console.error("Error fetching customers:", err);
      setError("Error fetching customers.");
    }
  };
  
  return (
    <div>
      <div className="search-form flex justify-between items-center my-4">
        <div className="relative flex flex-1 flex-shrink-0">
          <input
            id="customer-name"
            className="peer block w-full rounded-md border border-gray-300 py-[9px] pl-10 text-sm text-gray-900 outline-none placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            placeholder="Customer name"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
        <div>
          <button
            onClick={handleSearchClick}
            className="bg-[#262930] hover:bg-gray-600 text-white py-2 px-4 rounded ml-3"
          >
            Search
          </button>
        </div>
        <div>
          <Link href="/dashboard/customers/new">
            <button className="bg-[#262930] hover:bg-gray-600 text-white py-2 px-4 rounded ml-3">
              Add New Customer
            </button>
          </Link>
        </div>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <table className="hidden min-w-full text-gray-900 md:table">
        <thead className="bg-gray-100 text-left text-sm font-normal">
          <tr>
            <th scope="col" className="px-3 py-3 font-medium">Customer ID</th>
            <th scope="col" className="px-3 py-3 font-medium">First Name</th>
            <th scope="col" className="px-3 py-3 font-medium">Last Name</th>
            <th scope="col" className="px-3 py-3 font-medium">Email</th>
            <th scope="col" className="px-3 py-3 font-medium">Phone</th>
            <th scope="col" className="px-3 py-3 font-medium">Address</th>
            <th scope="col" className="px-4 py-3 font-medium">Note</th>
            <th scope="col" className="px-4 py-3 font-medium"></th>
            <th scope="col" className="px-4 py-3 font-medium"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-900">
          {customers.map((customer) => (
            <CustomerInfo key={customer.id} customer={customer} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
