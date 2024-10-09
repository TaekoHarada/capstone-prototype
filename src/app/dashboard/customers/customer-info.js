import React, { useState } from 'react';
import Link from 'next/link';
import { PencilIcon, TrashIcon, DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Order from '/src/app/models/Order';
import OrderPopup from './OrderPopup';

const CustomerInfo = ({ customer }) => {
  const [isOrderPopupOpen, setIsOrderPopupOpen] = useState(false);
  const [customerOrders, setCustomerOrders] = useState([]);

  const handleViewOrders = async () => {
    try {
      const orders = await Order.findByCustomerId(customer.id);
      setCustomerOrders(orders);
      setIsOrderPopupOpen(true);
    } catch (error) {
      console.error('Error fetching customer orders:', error);
    }
  };

  return (
    
    <tr key={customer.id} className="group">
      <td className="group backdrop-blur-sm">
        {customer.id}
      </td>
      <td className="group  backdrop-blur-sm">
        {customer.firstname}
      </td>
      <td className="group  backdrop-blur-sm">
        {customer.lastname}
      </td>
      <td className="group backdrop-blur-sm">
        {customer.email}
      </td>
      <td className="group backdrop-blur-sm">
        {customer.phone}
      </td>
      <td className="group backdrop-blur-sm">
        {customer.address}
      </td>
      <td className="group backdrop-blur-sm">
        {customer.note}
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <DocumentMagnifyingGlassIcon
          className="h-5 w-5 cursor-pointer"
          onClick={handleViewOrders}
        />
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <Link href={`/dashboard/customers/${customer.id}`}>
          <PencilIcon className="h-5 w-5 cursor-pointer" />
        </Link>
      </td>
      <OrderPopup
        isOpen={isOrderPopupOpen}
        closeModal={() => setIsOrderPopupOpen(false)}
        orders={customerOrders}
        customerId={customer.id}
      />
    </tr>
  );
};

export default CustomerInfo;
