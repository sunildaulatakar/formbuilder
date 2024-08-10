import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { toast} from 'react-toastify';


function CreateForm() {
  const [formName, setFormName] = useState('');
  const [fields, setFields] = useState([]);
  const navigate = useNavigate();

  const handleFormNameChange = (e) => {
    setFormName(e.target.value);
  };

  const handleFieldChange = (index, e) => {
    const { name, value } = e.target;
    const newFields = [...fields];
    newFields[index] = { ...newFields[index], [name]: value };
    setFields(newFields);
  };

  const addField = () => {
    setFields([...fields, { label: '', type: '', options: [], file: null }]);
  };

  const deleteField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleOptionChange = (fieldIndex, optionIndex, e) => {
    const newFields = [...fields];
    newFields[fieldIndex].options[optionIndex] = e.target.value;
    setFields(newFields);
  };

  const addOption = (fieldIndex) => {
    const newFields = [...fields];
    newFields[fieldIndex].options.push('');
    setFields(newFields);
  };

  const deleteOption = (fieldIndex, optionIndex) => {
    const newFields = [...fields];
    newFields[fieldIndex].options = newFields[fieldIndex].options.filter((_, i) => i !== optionIndex);
    setFields(newFields);
  };

  const onDrop = (acceptedFiles, index) => {
    const newFields = [...fields];
    newFields[index].file = acceptedFiles[0]; 
    setFields(newFields);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const validateForm = () => {
    if (!formName) {
      toast.error('Form name is required!');
      return false;
    }
    for (const field of fields) {
      if (!field.label || !field.type) {
        toast.error('All fields must have a label and type!');
        return false;
      }
      if (field.type === 'select' && field.options.length === 0) {
        toast.error('Select fields must have options!');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const id = Date.now();
    const formData = { id, name: formName, fields };

    const existingForms = JSON.parse(localStorage.getItem('formDataList')) || [];
    const updatedForms = [...existingForms, formData];

    localStorage.setItem('formDataList', JSON.stringify(updatedForms));
    toast.success('Form saved successfully!');
    navigate("/");
  };

  return (
    <div className="container my-5">
        <h2 className="fw-bold text-center text-danger">
        Form Builder
      </h2>
      <div className="d-flex justify-content-end mb-4">
        <Link to="/" className="btn btn-outline-primary fw-bold">
          <i className="fa fa-arrow-left me-2"></i>Back to Forms
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label>Form Name:</label>
              <input
                type="text"
                name="formName"
                id="formName"
                placeholder="Enter form name"
                className="form-control fw-bold"
                value={formName}
                onChange={handleFormNameChange}
              />
            </div>
          </div>
        </div>
        <hr />

        {fields.map((field, index) => (
          <div key={index}>
            <div className="d-flex py-1">
              <div>
                <button className="btn btn-sm btn-danger" type="button" onClick={() => deleteField(index)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>

            <ul className="list-group my-2">
              <li className="list-group-item">
                <div className="row">
                  <div className="col-3">
                    <div className="input-group">
                      <span className="input-group-text fw-bold">Label</span>
                      <input
                        type="text"
                        name="label"
                        value={field.label || ''}
                        onChange={(e) => handleFieldChange(index, e)}
                        className="form-control fw-bold"
                      />
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="input-group">
                      <span className="input-group-text fw-bold">Type</span>
                      <select
                        name="type"
                        value={field.type || ''}
                        onChange={(e) => handleFieldChange(index, e)}
                        className="form-select fw-bold"
                      >
                        <option value="">Select Field Type</option>
                        <option value="text">Text</option>
                        <option value="password">Password</option>
                        <option value="select">Select</option>
                        <option value="file">File</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-6">
                    {field.type === 'select' && (
                      <div>
                        <ul className="list-group my-2">
                          {field.options.map((option, optionIndex) => (
                            <li className="list-group-item" key={optionIndex}>
                              <div className="row">
                                <div className="col-9">
                                  <input
                                    type="text"
                                    name="option"
                                    className="form-control"
                                    value={option || ''}
                                    onChange={(e) => handleOptionChange(index, optionIndex, e)}
                                  />
                                </div>
                                <div className="col-3">
                                  <button className="btn btn-sm btn-danger" type="button" onClick={() => deleteOption(index, optionIndex)}>
                                  <i className="fa-solid fa-trash"></i>
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <button className="btn btn-success" type="button" onClick={() => addOption(index)}>
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </div>
                    )}
                    {field.type === 'file' && (
                      <div {...getRootProps({ className: 'dropzone border rounded border-dark border-dashed p-3 my-2' })}>
                        <input {...getInputProps()} />
                        <p>Drag and drop a file here</p>
                        {field.file && <p>File selected: {field.file.name}</p>}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        ))}

        <div className="d-flex">
          <button className="btn btn-outline-primary w-100 fw-bold" type="button" onClick={addField}>
            Add Field
          </button>
        </div>

        <div className="p-2">
          <button type="submit" className="btn btn-primary fw-bold">
            Create Form
          </button>
        </div>
      </form>
     
    </div>
  );
}

export default CreateForm;
