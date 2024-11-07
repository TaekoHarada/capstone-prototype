import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig'; // Import your Firebase configuration
import { collection, getDocs } from 'firebase/firestore';

const ProductList = () => {
  // State to hold the list of products
  const [products, setProducts] = useState([]);

  // Fetch products from Firestore when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsList = querySnapshot.docs.map(doc => doc.data());
        setProducts(productsList); // Set the fetched products to state
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts(); // Call the fetch function when the component mounts
  }, []); // Empty dependency array ensures it runs once on mount

  return (
    <div>
      <h1>Product Inventory</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.stock}</td>
              <td>${product.price}</td>
              <td>{product.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
