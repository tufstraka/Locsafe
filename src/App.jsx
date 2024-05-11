import { useState, createContext } from 'react'
//import { getDocs, collection} from 'firebase/firestore';
//import userDashboard from "./components/userDashboard.jsx";
import LandingPage from "./pages/landingpage.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Staff from "./components/staff.jsx";
import UserList from "./components/userList.jsx";
import UserReg from "./components/userReg.jsx";
import DispatcherReg from "./components/dispatcherReg.jsx";
import SignUpForm from "./components/signup.jsx";
import SignInForm from "./components/signin.jsx";
import GeofenceMap from "./components/geofence.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Vehicles from "./components/vehicles.jsx";
import UpdateProfilePage from './components/userProfile.jsx';
import PageNotFound from './components/PageNotFound.jsx'
import FeaturesPage from './pages/features.jsx'
import PricingPage from './pages/pricing.jsx'
import UserEdit from './components/userEdit.jsx'
import SignIn from './components/signin.jsx';
import ContactUs from './pages/contact.jsx';
import Register from './components/register.jsx';
import "./App.css";
import MyCalendar from './components/calendar.jsx';

export const AppContext = createContext();

const App = () =>  {
  const [username, setUsername] = useState("");
  const [showNav, setShowNav] = useState(false);
  console.log(username)

  const toggleNav = ()=>{
    setShowNav(prev => !prev);
  }

  const configValue = {showNav, toggleNav}
  
  return (
    <>
      <AppContext.Provider value={configValue}>
        <Router>
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            
              <Route path="/staff" element={<Staff />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path='/login' element={<SignIn/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/calendar' element={<MyCalendar/>}/>
              <Route path='/contact' element={<ContactUs/>} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/users/:userId/edit" element={<UserEdit />} />
              <Route path="/user/register" element={<UserReg />} />
              <Route path="/users/update" element={<UserList />} />
              <Route path="/user/signin" element={<SignInForm />} />
              <Route path="/dispatchers/register" element={<DispatcherReg />} />
              <Route path="/geofence" element={<GeofenceMap />} />
              <Route path="/user/profile" element={<UpdateProfilePage username={username} setUsername={setUsername} />} />
              <Route path="/vehicles" element={<Vehicles />} />
              <Route path="/user/dashboard" element={<userDashboard username={username} setUsername={setUsername} />} />
              <Route path="" element={<SignInForm />} />
              <Route path="" element={<SignInForm />} />
              <Route path="/user/signup" element={<SignUpForm username={username} setUsername={setUsername}/>} />
              <Route path="" element={<SignInForm />} />
              <Route path="/admin/dashboard" element={<Dashboard/>}/>
              <Route path="*" element={<PageNotFound/>} />
            
          </Routes>
        </Router>
      </AppContext.Provider>

    </>
  );
}

export default App;
