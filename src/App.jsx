
import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import Forms from "./componants/Forms";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateForm from "./componants/CreateForm";
import FormPreview from "./componants/FormPreview";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Forms/>} />
        <Route path="/forms/create" element={<CreateForm/>}/>
        <Route path="/forms/:formId/preview" element={<FormPreview/>} />  
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
    
  );
}

export default App;
