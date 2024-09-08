//import { getDocs, collection} from 'firebase/firestore';
//import userDashboard from "./components/userDashboard.jsx";
import LandingPage from './pages/landingpage.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { NavigationProvider } from './contexts/navigationContext.jsx'
import Staff from './components/staff.jsx'
import AssetForm from './components/assetForm.jsx'
import { AuthProvider } from './contexts/authContext.jsx'
import UserList from './components/userList.jsx'
import UserReg from './components/userReg.jsx'
import DispatcherReg from './components/dispatcherReg.jsx'
import ProtectedRoute from './components/protectedRoute.jsx'
//import SignUpForm from "./components/signup.jsx";
import SignInForm from './components/signin.jsx'
import GeofenceMap from './components/geofence.jsx'
import Dashboard from './pages/dashboard.jsx'
import Assets from './components/assets.jsx'
import BlogArticle from './components/blog.jsx'
//import UpdateProfilePage from './components/userProfile.jsx';
import PageNotFound from './components/PageNotFound.jsx'
import FeaturesPage from './pages/features.jsx'
import PricingPage from './pages/pricing.jsx'
import UserEdit from './components/userEdit.jsx'
//import SignIn from './components/signin.jsx';
import ContactUs from './pages/contact.jsx'
import Register from './components/register.jsx'
import Paywall from './components/paywall.jsx'
import Login from './pages/login.jsx'
import Alerts from './pages/alerts.jsx'
import './App.css'
import MyCalendar from './components/calendar.jsx'
import Settings from './pages/settings.jsx'
import Reports from './pages/reports.jsx'
import Insights from './pages/insights.jsx'
import UserConsent from './components/user-consent.jsx'
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';


const App = () => {
  return (
    <>
      <AuthProvider>
        <NavigationProvider>
          <Router>
          <UserConsent/>
            <Routes>
              <Route exact path='/' element={<LandingPage />} />

              <Route path='/staff' element={<Staff />} />
              <Route path='/alerts' element={<Alerts />} />
              <Route path='/insights' element={<Insights />} />
              <Route path='/reports' element={<Reports />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/blog' element={<BlogArticle />} />
              <Route path='/features' element={<FeaturesPage />} />
              <Route path='/login' element={<Login />} />
              <Route path='/pay' element={<Paywall />} />
              <Route path='/register' element={<Register />} />
              <Route path='/calendar' element={<MyCalendar />} />
              <Route path='/contact' element={<ContactUs />} />
              <Route path='/pricing' element={<PricingPage />} />
              <Route path='/users/:userId/edit' element={<UserEdit />} />
              <Route path='/add/asset' element={<AssetForm/>} />
              <Route path='/user/register' element={<UserReg />} />
              <Route path='/users/update' element={<UserList />} />
              <Route path='/user/signin' element={<SignInForm />} />
              <Route path='/dispatchers/register' element={<DispatcherReg />} />
              <Route path='/geofence' element={<GeofenceMap />} />
              {/*<Route path="/user/profile" element={<UpdateProfilePage username={username} setUsername={setUsername} />} />*/}
              <Route path='/assets' element={<Assets />} />
              {/*<Route path="/user/dashboard" element={<userDashboard username={username} setUsername={setUsername} />} />*/}
              <Route path='' element={<SignInForm />} />
              <Route path='' element={<SignInForm />} />
              {/*<Route path="/user/signup" element={<SignUpForm username={username} setUsername={setUsername}/>} />*/}
              <Route path='' element={<SignInForm />} />
              <Route
                path='/admin/dashboard'
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </Router>
          <TawkMessengerReact
                propertyId="66dd702eea492f34bc0f5f58"
                widgetId="1i78fsdo2"
                onLoad={() => console.log('Tawk Messenger loaded')}
          onChatMinimized={() => console.log('Chat minimized')}
          onChatMaximized={() => console.log('Chat maximized')}/>
        </NavigationProvider>
      </AuthProvider>
    </>
  )
}

export default App
