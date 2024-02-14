import React, { useState, useEffect } from 'react';
import '../Styles/categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
  });
  const [showForm, setShowForm] = useState(false);


useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://equisoft-c8b72-default-rtdb.firebaseio.com/categories.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Category added successfully!');
        setCategories([...categories, formData.name]);
        setFormData({ name: '' });
      } else {
        alert('Failed to add category!');
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await fetch(`https://equisoft-c8b72-default-rtdb.firebaseio.com/categories/${id}.json`, {
          method: 'DELETE',
        });
        alert('Category deleted successfully!');
        setCategories(categories.filter((category) => category.id !== id));
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };


return (
    <div>
      <h2>Categories List</h2>
      <button class="addCategory" onClick={() => setShowForm(!showForm)}>Add Category</button>
      {showForm && (
        <form onSubmit={handleSubmit} class="company-form">
         <h2>Create Category</h2>
          <label class="company-form-label">
            Category Name:
            <input type='text' name='name' value={formData.name} onChange={handleChange} />
          </label>
          <button type='submit' class="company-form-button">Submit</button>
        </form>
      )}
      <table>
        <thead>
           <tr>
             <th>Name</th>
             <th>Actions</th>
           </tr>
      </thead>
      <tbody>
      {categories.map((category) => (
        <tr key={category.id}>
            <td>{category.name}</td>
            <td><button class="delButton" onClick={() => handleDelete(category.id)}>Delete</button></td>
        </tr>
        ))}  
     </tbody>
    </table>
    </div>
  );
};

export default Categories;