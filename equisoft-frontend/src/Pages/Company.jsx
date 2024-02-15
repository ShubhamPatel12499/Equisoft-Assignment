import React, { useState, useEffect } from 'react';
import '../Styles/companies.css';

const Company = () => {
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://equisoft-c8b72-default-rtdb.firebaseio.com/companies.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Company added successfully!');
        setFormData({
          name: '',
        });
        const { name, id } = await response.json();
        localStorage.setItem(id, name);
        setCompanies([...companies, { id, name }]);
      } 
      else {
        alert('Failed to add company!');
      }
    } catch (error) {
      console.error('Error adding company:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      try {
        await fetch(`https://equisoft-c8b72-default-rtdb.firebaseio.com/companies/${id}.json`, {
          method: 'DELETE',
        });
        alert('Company deleted successfully!');
        setCompanies(companies.filter((company) => company.id !== id));
      } catch (error) {
        console.error('Error deleting company:', error);
      }
    }
  };

  return (
    <div>
      <h2>Companies</h2>
      <button onClick={() => setShowForm(!showForm)} class="addCategory">Add Company</button>
      {showForm && (
        <form onSubmit={handleSubmit} class="company-form">
            <h2>Create Company</h2>
            <label class="company-form-label">
            Company Name:
               <input type='text' name='name' value={formData.name} onChange={handleChange} />
            </label>
            <button class="company-form-button" type='submit'>Submit</button>
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
          {companies.map((company) => (
            <tr key={company.id}>
              <td>{company.name}</td>
              <td>
                <button class="delCompany" onClick={() => handleDelete(company.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Company;