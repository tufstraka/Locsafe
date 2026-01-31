import UserDashboard from "./components/userDashboard.jsx";
import LandingPage from './pages/landingpage.jsx'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { NavigationProvider } from './contexts/navigationContext.jsx'
import Staff from './components/staff.jsx'
import AssetForm from './components/assetForm.jsx'
import { AuthProvider } from './contexts/authContext.jsx'
import { OnboardingProvider } from './contexts/onboardingContext.jsx'
import UserList from './components/userList.jsx'
import UserReg from './components/userReg.jsx'
import DispatcherReg from './components/dispatcherReg.jsx'
import ProtectedRoute from './components/protectedRoute.jsx'
import GeofenceMap from './components/geofence.jsx'
import Dashboard from './pages/dashboard.jsx'
import Geofence from './pages/geofence.jsx'
import NewShipment from './pages/new-shipment.jsx'
import BlockchainExplorer from './pages/blockchain-explorer.jsx'
import Assets from './components/assets.jsx'
import BlogArticle from './components/blog.jsx'
import PageNotFound from './components/PageNotFound.jsx'
import FeaturesPage from './pages/features.jsx'
import PricingPage from './pages/pricing.jsx'
import TermsOfService from './pages/terms.jsx'
import PrivacyPolicy from './pages/privacy.jsx'
import UserEdit from './components/userEdit.jsx'
import ContactUs from './pages/contact.jsx'
import Register from './components/register.jsx'
import Paywall from './components/paywall.jsx'
import FeedbackPage from './pages/feedback.jsx'
import Login from './pages/login.jsx'
import Alerts from './pages/alerts.jsx'
import './App.css'
import MyCalendar from './components/calendar.jsx'
import Settings from './pages/settings.jsx'
import Reports from './pages/reports.jsx'
import Insights from './pages/insights.jsx'
import UserConsent from './components/user-consent.jsx'
import Onboarding from './pages/onboarding.jsx'
import LastMileSolution from './pages/solutions/last-mile.jsx'
import ColdChainSolution from './pages/solutions/cold-chain.jsx'
import FleetManagementSolution from './pages/solutions/fleet-management.jsx'
import WarehouseAutomation from './pages/solutions/warehouse-automation.jsx'
import DPPGenerator from "./pages/dpp-generator.jsx";
import Notifications from "./pages/notifications.jsx";
import Users from "./pages/users.jsx";
import Maintenance from "./pages/maintenance.jsx";

const App = () => {
  return (
    <>
      <AuthProvider>
        <OnboardingProvider>
          <NavigationProvider>
            <Router>
              <UserConsent/>
              <Routes>
                {/* Public Marketing Routes */}
                <Route exact path='/' element={<LandingPage />} />
                <Route path='/features' element={<FeaturesPage />} />
                <Route path='/pricing' element={<PricingPage />} />
                <Route path='/contact' element={<ContactUs />} />
                <Route path='/blog' element={<BlogArticle />} />
                <Route path='/terms' element={<TermsOfService />} />
                <Route path='/privacy' element={<PrivacyPolicy />} />
                <Route path='/feedback' element={<FeedbackPage />} />
                
                {/* Solution Pages */}
                <Route path='/solutions/last-mile' element={<LastMileSolution />} />
                <Route path='/solutions/cold-chain' element={<ColdChainSolution />} />
                <Route path='/solutions/fleet-management' element={<FleetManagementSolution />} />
                <Route path='/solutions/warehouse' element={<WarehouseAutomation />} />

                {/* Authentication Routes */}
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/signup' element={<Navigate to="/register" replace />} />
                <Route path='/signin' element={<Navigate to="/login" replace />} />

                {/* Onboarding & Subscription */}
                <Route path='/onboarding' element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
                <Route path='/subscribe' element={<Paywall />} />
                <Route path='/pay' element={<Navigate to="/subscribe" replace />} />

                {/* Main Application Routes - Protected */}
                <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path='/shipments' element={<ProtectedRoute><NewShipment /></ProtectedRoute>} />
                <Route path='/shipments/new' element={<ProtectedRoute><NewShipment /></ProtectedRoute>} />
                <Route path='/assets' element={<ProtectedRoute><Assets /></ProtectedRoute>} />
                <Route path='/assets/new' element={<ProtectedRoute><AssetForm /></ProtectedRoute>} />
                <Route path='/geofencing' element={<ProtectedRoute><Geofence /></ProtectedRoute>} />
                <Route path='/alerts' element={<ProtectedRoute><Alerts /></ProtectedRoute>} />
                <Route path='/insights' element={<ProtectedRoute><Insights /></ProtectedRoute>} />
                <Route path='/reports' element={<ProtectedRoute><Reports /></ProtectedRoute>} />
                <Route path='/settings' element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path='/notifications' element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
                <Route path='/blockchain' element={<ProtectedRoute><BlockchainExplorer /></ProtectedRoute>} />
                <Route path='/dpp' element={<ProtectedRoute><DPPGenerator /></ProtectedRoute>} />
                <Route path='/calendar' element={<ProtectedRoute><MyCalendar /></ProtectedRoute>} />
                <Route path='/maintenance' element={<ProtectedRoute><Maintenance /></ProtectedRoute>} />

                {/* User Management Routes - Admin */}
                <Route path='/users' element={<ProtectedRoute><Users /></ProtectedRoute>} />
                <Route path='/users/:userId/edit' element={<ProtectedRoute><UserEdit /></ProtectedRoute>} />
                <Route path='/team' element={<ProtectedRoute><Staff /></ProtectedRoute>} />
                <Route path='/team/users' element={<ProtectedRoute><UserList /></ProtectedRoute>} />
                <Route path='/team/users/new' element={<ProtectedRoute><UserReg /></ProtectedRoute>} />
                <Route path='/team/dispatchers/new' element={<ProtectedRoute><DispatcherReg /></ProtectedRoute>} />

                {/* Driver/Field User Routes */}
                <Route path='/driver' element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />

                {/* Legacy Route Redirects for backward compatibility */}
                <Route path='/admin/dashboard' element={<Navigate to="/dashboard" replace />} />
                <Route path='/user/dashboard' element={<Navigate to="/driver" replace />} />
                <Route path='/user/signin' element={<Navigate to="/login" replace />} />
                <Route path='/user/register' element={<Navigate to="/register" replace />} />
                <Route path='/new-shipment' element={<Navigate to="/shipments/new" replace />} />
                <Route path='/add/asset' element={<Navigate to="/assets/new" replace />} />
                <Route path='/geofence' element={<Navigate to="/geofencing" replace />} />
                <Route path='/geofence-old' element={<ProtectedRoute><GeofenceMap /></ProtectedRoute>} />
                <Route path='/blockchain-explorer' element={<Navigate to="/blockchain" replace />} />
                <Route path='/dpp-generator' element={<Navigate to="/dpp" replace />} />
                <Route path='/dispatchers/register' element={<Navigate to="/team/dispatchers/new" replace />} />
                <Route path='/users/update' element={<Navigate to="/team/users" replace />} />
                <Route path='/staff' element={<Navigate to="/team" replace />} />
                <Route path='/solutions/fleet' element={<Navigate to="/solutions/fleet-management" replace />} />

                {/* Catch all - 404 */}
                <Route path='*' element={<PageNotFound />} />
              </Routes>
            </Router>
          </NavigationProvider>
        </OnboardingProvider>
      </AuthProvider>
    </>
  )
}

export default App
