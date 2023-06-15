import { useState, useEffect } from 'react'
import { getDocs, collection} from 'firebase/firestore';
import DriverDashboard from "./components/driverDashboard.jsx";
import LandingPage from "./components/landingpage.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Staff from "./components/staff.jsx";
import DriverList from "./components/driverList.jsx";
import DriverReg from "./components/driverReg.jsx";
import DispatcherReg from "./components/dispatcherReg.jsx";
import SignUpForm from "./components/signup.jsx";
import SignInForm from "./components/signin.jsx";
import GeofenceMap from "./components/geofence.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Vehicles from "./components/vehicles.jsx";
import UpdateProfilePage from './components/driverProfile.jsx';
import "./App.css";


const App = () =>  {
  const [username, setUsername] = useState("");
  
  console.log(username)

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          
            <Route path="/staff" element={<Staff />} />
            <Route path="/driver/register" element={<DriverReg />} />
            <Route path="/drivers/update" element={<DriverList />} />
            <Route path="/signin" element={<SignInForm />} />
            <Route path="/dispatchers/register" element={<DispatcherReg />} />
            <Route path="/geofence" element={<GeofenceMap />} />
            <Route path="/driver/profile" element={<UpdateProfilePage username={username} setUsername={setUsername} />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/driver/dashboard" element={<DriverDashboard username={username} setUsername={setUsername} />} />
            <Route path="" element={<SignInForm />} />
            <Route path="" element={<SignInForm />} />
            <Route path="/signup" element={<SignUpForm username={username} setUsername={setUsername}/>} />
            <Route path="" element={<SignInForm />} />
            <Route path="/dashboard" element={<Dashboard/>}/>
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
