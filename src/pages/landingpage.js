import { Helmet } from 'react-helmet';
import { FaMapMarkerAlt, FaCalendarAlt, FaCheck } from 'react-icons/fa';
import Image from '../assets/3d-casual-life-trail-map.png';
import Header from '../components/header';
import Footer from '../components/footer';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Helmet>
        <title>Locsafe™ - Asset Tracking and Management System</title>
        <meta
          name="description"
          content="Locsafe™ is an asset tracking and management system that helps you keep track of your assets in real-time. Track your assets anywhere in the world, set up custom alerts and notifications, and enjoy an easy-to-use interface with an intuitive dashboard."
        />
      </Helmet>
      <Header/>
      <main className="container mx-auto flex-1 my-16 flex flex-col md:flex-row px-4">
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold mb-8">Track your assets with ease</h2>
          <p className="text-gray-700 text-xl mb-8">
            Locsafe™ is an asset tracking and management system that helps you keep track of your assets in real-time.
          </p>
          <div className="flex items-center space-x-4 text-gray-700 font-medium mb-8">
            <FaMapMarkerAlt className="text-2xl text-blue-500" />
            <p>Track your assets anywhere in the world</p>
          </div>
          <div className="flex items-center space-x-4 text-gray-700 font-medium mb-8">
            <FaCalendarAlt className="text-2xl text-blue-500" />
            <p>Set up custom alerts and notifications</p>
          </div>
          <div className="flex items-center space-x-4 text-gray-700 font-medium">
            <FaCheck className="text-2xl text-blue-500" />
            <p>Easy-to-use interface and intuitive dashboard</p>
          </div>
        </div>
        <div className="md:w-1/2">
          <img className="h-full w-full object-contain rounded-lg" src={Image.src} alt="3D casual life trail map" />
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default LandingPage;


