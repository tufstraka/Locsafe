//import { useState } from 'react'
import LandingPage from "./components/landingpage.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Staff from "./components/staff.jsx";
import DriverList from "./components/driverList.jsx";
import DriverReg from "./components/driverReg.jsx";
import DispatcherReg from "./components/dispatcherReg.jsx";
import SignUpForm from "./components/signup.jsx";
import SignInForm from "./components/signin.jsx";
import Dashboard from "./pages/dashboard.jsx";
import "./App.css";


const App = () =>  {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          
            <Route path="/staff" element={<Staff />} />
            <Route path="/drivers/register" element={<DriverReg />} />
            <Route path="/drivers/update" element={<DriverList />} />
            <Route path="/sign" element={<SignInForm />} />
            <Route path="/dispatchers/register" element={<DispatcherReg />} />
            <Route path="" element={<SignInForm />} />
            <Route path="" element={<SignInForm />} />
            <Route path="" element={<SignUpForm />} />
            <Route path="" element={<SignInForm />} />
            <Route path="/dashboard" element={<Dashboard/>}/>
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
