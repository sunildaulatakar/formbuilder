import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function FormPreview() {
  const { formId } = useParams();
  const [form, setForm] = useState(null);

  useEffect(() => {
//fetching
    const storedForms = JSON.parse(localStorage.getItem('formDataList')) || [];
    const formToPreview = storedForms.find(form => form.id === parseInt(formId, 10));
    
    setForm(formToPreview);
  }, [formId]);

  if (!form) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="d-flex mb-4">
            <div className="me-auto"> 
              <h2 className="fw-bold text-center text-danger">
              {form.name}
      </h2>
            </div>
            <div>
              <Link to="/" className="btn btn-outline-primary fw-bold"><i className="fa fa-arrow-left me-2"></i>Back To Forms</Link>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              {form.fields.map((field, index) => (
                <div key={index} className="mb-3 ">
                  <label className="form-label ">{field.label}</label>
                  {field.type === 'select' ? (
                    <select className="form-select">
                      <option value="">Select an option</option>
                      {field.options.map((option, i) => (
                        <option key={i} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input 
                      type={field.type} 
                      className="form-control fw-bold" 
                      placeholder={`This is a ${field.type} field`} 
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormPreview;
