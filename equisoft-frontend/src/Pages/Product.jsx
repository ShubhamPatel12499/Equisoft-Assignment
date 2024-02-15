import React, { useState, useEffect } from 'react';
import '../Styles/product.css';
import { Link } from 'react-router-dom';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    company: '',
    description: '',
    price: '',
    qty: '',
    image: '',
  });
   const [showForm, setShowForm] = useState(false);
   const [editProduct, setEditProduct] = useState(null);
   const [categories, setCategories] = useState([]);
   const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://equisoft-c8b72-default-rtdb.firebaseio.com/product.json');
        const data = await response.json();
        const fetchedProducts = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://equisoft-c8b72-default-rtdb.firebaseio.com/categories.json');
        const data = await response.json();
        const fetchedCategories = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    const fetchCompanies = async () => {
      try {
        const response = await fetch('https://equisoft-c8b72-default-rtdb.firebaseio.com/companies.json');
        const data = await response.json();
        const fetchedCompanies = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setCompanies(fetchedCompanies);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };
  
    fetchCategories();
    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editProduct) {
        response = await fetch(`https://equisoft-c8b72-default-rtdb.firebaseio.com/product/${editProduct.id}.json`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } else {
        response = await fetch('https://equisoft-c8b72-default-rtdb.firebaseio.com/product.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }
      if (response.ok) {
        const updatedProduct = await response.json();
        if (editProduct) {
          setProducts(products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)));
        } else {
          setProducts([...products, updatedProduct]);
        }
        alert(editProduct ? 'Product updated successfully!' : 'Product added successfully!');
        setFormData({
          productName: '',
          category: '',
          company: '',
          description: '',
          price: '',
          qty: '',
          image: '',
        });
        setEditProduct(null);
        setShowForm(false);
      } else {
        alert('Failed to add/update product!');
      }
    } catch (error) {
      console.error('Error adding/updating product:', error);
    }
  };

  const handleEdit = (product) => {

    setFormData({ ...product });
    setEditProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await fetch(`https://equisoft-c8b72-default-rtdb.firebaseio.com/product/${id}.json`, {
          method: 'DELETE',
        });
        alert('Product deleted successfully!');
        setProducts(products.filter((product) => product.id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className='product-container'>
      <h2>Products</h2>
      <button onClick={() => setShowForm(!showForm)} class="addProduct">Add Product</button>
      {showForm && (
      <form onSubmit={handleSubmit} className="form-container">
        <label>
          Product Name:
          <input type='text' name='productName' value={formData.productName} onChange={handleChange} />
        </label>
        <label>
          Category:
          <select name='category' value={formData.category} onChange={handleChange}>
            <option value=''>Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Company:
          <select name='company' value={formData.company} onChange={handleChange}>
            <option value=''>Select Company</option>
            {companies.map((company) => (
              <option key={company.id} value={company.name}>
                {company.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Description:
          <textarea name='description' value={formData.description} onChange={handleChange} />
        </label>
        <label>
          Price:
          <input type='text' name='price' value={formData.price} onChange={handleChange} />
        </label>
        <label>
          Qty:
          <input type='text' name='qty' value={formData.qty} onChange={handleChange} />
        </label>
        <label>
          Image:
          <input type='text' name='image' value={formData.image} onChange={handleChange} />  
        </label>
        <button type='submit'>Submit</button>
      </form>
         )}
      <table class= "table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Company Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td><img src={product.image} alt={product.productName}/></td>
              <td><Link to={`/product/${product.id}`}>{product.productName}</Link></td>
              <td>{product.category}</td>
              <td>{product.company}</td>
              <td>{product.price}</td>
              <td class="actionsbtn">
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Product;