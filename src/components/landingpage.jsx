import { FaMapMarkerAlt, FaCalendarAlt, FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Image from '../assets/3d-casual-life-trail-map.png';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="py-6 bg-white shadow-lg">
        <div className="container mx-auto flex items-center justify-between px-4">
          <h1 className="text-3xl font-bold text-gray-800">Locsafe™</h1>
          <nav>
            <ul className="flex items-center space-x-8 text-gray-600 font-medium">
              <li>
                <Link to="#" className="hover:text-gray-800">Features</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-gray-800">Pricing</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-gray-800">Contact</Link>
              </li>
               <li>
                {/*<li>
                <Link to="/admin/dashboard" className="hover:text-gray-800 bg-indigo-500 p-4 rounded">Login</Link>
              </li>*/}
              </li> 
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto my-16 flex flex-col md:flex-row px-4">
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold mb-8">Track your vehicles with ease</h2>
          <p className="text-gray-700 text-xl mb-8">
            Locsafe is a GPS fleet tracking and management system that helps you keep track of your vehicles in real-time.
          </p>
          <div className="flex items-center space-x-4 text-gray-700 font-medium mb-8">
            <FaMapMarkerAlt className="text-2xl text-blue-500" />
            <p>Track your vehicles anywhere in the world</p>
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
          <img className="h-full w-full object-cover rounded-lg" src={Image} alt="3D casual life trail map" />
        </div>
      </main>
      <footer className="py-6 bg-white shadow-lg">
        <div className="container mx-auto flex items-center justify-between px-4">
          <p className="text-gray-600">© 2024 Locsafe. All rights reserved.</p>
          <nav>
            <ul className="flex items-center space-x-8 text-gray-600 font-medium">
              <li>
                <a href="#" className="hover:text-gray-800">Terms</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800">Privacy</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800">Support</a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

