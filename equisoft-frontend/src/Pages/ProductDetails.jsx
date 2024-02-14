import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../Styles/ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://equisoft-c8b72-default-rtdb.firebaseio.com/product/${id}.json`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className='product-details-container'>
      {product && (
        <div className='product-details-card'>
          <h2>Product Name: {product.productName}</h2>
          <p>Category: {product.category}</p>
          <p>Company: {product.company}</p>
          <p>Description: {product.description}</p>
          <p>Price: {product.price}</p>
          <p>Qty: {product.qty}</p>
          <img src={product.image} alt={product.productName} />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
