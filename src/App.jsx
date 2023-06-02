//import { useState } from 'react'
import Map from './components/map.jsx'
import MapComponent from './components/testmap.jsx'
import LandingPage from './components/landingpage.jsx'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Drivers from './components/drivers.jsx';
import DriverReg from './components/driverReg.jsx'
import SignUpForm from './components/signup.jsx'
import SignInForm from './components/signin.jsx'
import Dashboard from './pages/dashboard.jsx'
import './App.css'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route exact path='/' element={<Dashboard/>} />
        <Route path='/drivers' element={<Drivers/>} />
        <Route path='/drivers/register' element={<DriverReg/>} />
        <Route path='' element={<SignUpForm />}/>
        <Route path='' element={<SignInForm />}/>
        <Route path='' element={<LandingPage />}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
