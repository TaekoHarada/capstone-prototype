"use client";

import React, { useState, useEffect } from "react";
import OrderInfo from "./order-info"; 
import Order from "/src/app/models/Order";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"; 

const ResultList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [searchId, setSearchId] = useState(""); 
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchOrders = async () => {
      //Try and Catch block
      try {
        const data = await Order.findAll();
        setOrders(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders.");
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleSearchClick = async () => {
    if (!searchId) {
      setError("Please enter an order ID.");
      return;
    }

    setIsLoading(true); //Chatgpt
    try {
      const result = await Order.findById(searchId); 
      if (result) {
        setOrders([result]); 
      } else {
        setOrders([]);
        setError("No order found with the given ID.");
      }
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching order:", err);
      setError("Error fetching order.");
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
      <h2 className="font-bold text-gray-900 dark:text-white">
       Order List
      </h2>

      {/* Search functionality */}
      <div className="search-form flex justify-between items-center my-4">
        <div className="relative flex flex-1 flex-shrink-0">
          <input
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)} 
            className="peer block w-full rounded-md border border-gray-300 dark:border-gray-600 py-[9px] pl-10 text-sm text-gray-900 dark:text-white outline-none placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
            placeholder="Order ID" //chatgpt
          /> 
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:peer-focus:text-white" />
        </div>
        <div>
          <button
            onClick={handleSearchClick}
            className="bg-[#262930] dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white py-2 px-4 rounded ml-3 transition-colors duration-200"
          >
            Search
          </button>
        </div>
        <div>
          <Link href="/dashboard/orders/new">
            <button className="bg-[#262930] dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white py-2 px-4 rounded ml-3 transition-colors duration-200">
              Add New Order
            </button>
          </Link>
        </div>
      </div>

      {error && <div className="text-red-500 dark:text-red-400">{error}</div>}

      {isLoading ? (
        <div className="text-center py-4">
          <span className="text-gray-500 dark:text-gray-400">Loading orders...</span>
        </div> //indicator
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-gray-900 dark:text-white dark:bg-gray-800">
            <thead className="bg-gray-100 dark:bg-gray-700 text-left text-sm font-medium">
              <tr>
                <th scope="col" className="px-3 py-3">Order ID</th>
                <th scope="col" className="px-3 py-3">Status</th>
                <th scope="col" className="px-3 py-3">Customer Name</th>
                <th scope="col" className="px-3 py-3">Item</th>
                <th scope="col" className="px-3 py-3">Shipping</th>
                <th scope="col" className="px-3 py-3">Order</th>
                <th scope="col" className="px-3 py-3">Deliver</th>
                <th scope="col" className="px-4 py-3">Payment</th>
                <th scope="col" className="px-4 py-3">Method</th>
                <th scope="col" className="px-4 py-3">Cost</th>
                <th scope="col" className="px-4 py-3">Paid</th>
                <th scope="col" className="px-4 py-3">Remaining</th>
                <th scope="col" className="px-4 py-3">Invoice</th>
                <th scope="col" className="px-4 py-3"> </th>
              </tr>
            </thead>

            {/* Orders list */}
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600 bg-white dark:bg-gray-800">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <OrderInfo key={order.id} order={order} />
                ))
              ) : (
                <tr>
                  <td colSpan="14" className="text-center text-gray-500 dark:text-gray-400">
                    No orders available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderList;
