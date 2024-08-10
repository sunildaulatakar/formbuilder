import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


function Forms() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    // Retrieve and parse the form data from local storage
    const storedForms = JSON.parse(localStorage.getItem('formDataList')) || [];
    setForms(storedForms);
  }, []);

  const handleDelete = (formId) => {
    const updatedForms = forms.filter(form => form.id !== formId);
    localStorage.setItem('formDataList', JSON.stringify(updatedForms));
    setForms(updatedForms);
    toast.success('Form deleted successfully!');
  };

  return (
    <div className="container">
      <div className="d-flex my-5">
        <div className="me-auto">
          <h2 className="fw-bold text-center text-danger">Forms</h2>
        </div>
        <div>
          <Link to="/forms/create" className="btn btn-outline-primary fw-bold">Create Form</Link>
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Form Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {forms.length > 0 ? forms.map((form) => (
            <tr key={form.id}>
              <td>{form.id}</td>
              <td>{form.name}</td>
              <td>
                <Link to={`/forms/${form.id}/preview`} className="btn btn-info mx-1">
                  <i className="fa-solid fa-eye"></i>
                </Link>
                <button
                  className="btn btn-danger mx-1"
                  onClick={() => handleDelete(form.id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="3">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Forms;
