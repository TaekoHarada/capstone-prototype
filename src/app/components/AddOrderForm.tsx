'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Order from '@/app/models/Order'

export default function AddOrderForm() { // Updated function name
  const router = useRouter()
  const [formData, setFormData] = useState({
    productName: '', // Changed field
    quantity: 0, // Changed field
    price: 0, // Changed field
    customerName: '', // Changed field
    orderDate: '', // Changed field
    note: '', // Kept field
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await Order.create(formData) // Updated to use Order model
      router.push('/dashboard/orders') // Updated route
    } catch (error) {
      console.error('Error adding order:', error) // Updated error message
      // Handle error (e.g., show error message to user)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-6 rounded-lg shadow-md">
      <div>
        <label htmlFor="productName" className="block mb-1">Product Name</label> {/* Updated label */}
        <input
          type="text"
          id="productName"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded transition duration-300 ease-in-out hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="quantity" className="block mb-1">Quantity</label> {/* Updated label */}
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded transition duration-300 ease-in-out hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="price" className="block mb-1">Price</label> {/* Updated label */}
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded transition duration-300 ease-in-out hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="customerName" className="block mb-1">Customer Name</label> {/* Updated label */}
        <input
          type="text"
          id="customerName"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded transition duration-300 ease-in-out hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="orderDate" className="block mb-1">Order Date</label> {/* Updated label */}
        <input
          type="date"
          id="orderDate"
          name="orderDate"
          value={formData.orderDate}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded transition duration-300 ease-in-out hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="note" className="block mb-1">Note</label>
        <textarea
          id="note"
          name="note"
          value={formData.note}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded transition duration-300 ease-in-out hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out">
        Add Order {/* Updated button text */}
      </button>
    </form>
  )
}