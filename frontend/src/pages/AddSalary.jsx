import React, { useEffect } from "react";
import SalaryForm from "../components/SalaryForm";
import Navbar_Pay from "../components/Navbar-uvi";


const AddSalaryPage = () => {
  return (
    <Navbar_Pay>
    <div className="add-salary-page">
     
      <SalaryForm />
    </div>
    </Navbar_Pay>
  );
};

export default AddSalaryPage;
