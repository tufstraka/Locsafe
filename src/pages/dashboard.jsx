import { useState, useEffect } from 'react';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { getDocs, collection } from 'firebase/firestore';
import db from '../utils/firebaseInit';
import Map from '../components/map.jsx';
import Sidebar from '../components/sidebar.jsx';

const Dashboard = () => {
  const [drivers, setDrivers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'drivers'));
      console.log(querySnapshot);
      setDrivers(querySnapshot.docs.length);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
        <Sidebar />

      {/* Content area */}
      <div className="flex flex-col flex-grow overflow-y-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b bg-white">
          <button className="text-gray-600 hover:text-gray-800 transition-colors duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500">
            <IoIosNotificationsOutline className="w-6 h-6" />
          </button>
          <div className="flex items-center">
            <p className="text-gray-600 text-sm mr-2">Welcome back</p>
            <img
              className="w-8 h-8 rounded-full"
              src="https://via.placeholder.com/150"
              alt="Profile"
            />
          </div>
        </div>

        {/* Map and stats */}
        <div className="flex-grow p-4">
          <Map />
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mt-4">

            <div className="p-5">
              <h2 className="mb-4 text-lg font-medium text-gray-800">Overview</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* Cards */}
                {[
                  { title: 'Total Vehicles', value: '0' },
                  { title: 'Total Drivers', value: drivers },
                  { title: 'Total Alerts', value: '0' },
                  { title: 'Total Trips', value: '0' },
                ].map((card, index) => (
                  <div key={index} className="flex flex-col justify-between p-4 bg-white border rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200">
                    <div>
                      <span className="text-sm font-medium text-gray-600">
                        {card.title}
                      </span>
                      <span className="block text-lg font-semibold text-gray-800"> {card.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


