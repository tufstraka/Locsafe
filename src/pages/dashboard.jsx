import { useState, useEffect } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { getDocs, collection} from "firebase/firestore";
import db from '../utils/firebaseInit';
import Map from "../components/map.jsx";
import Sidebar from "../components/sidebar.jsx";

const Dashboard = () => {
  const [ Drivers, setDrivers] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'drivers'));
      //const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      console.log(querySnapshot)
      setDrivers(querySnapshot.docs.length);
    };
    fetchData();
  }, []);
  return (
    
    <div className="flex  bg-gray-100">
    
      <Sidebar/>
      {/* Main content */}
      <div className="flex flex-col flex-grow">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center">
            <button className="text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500">
              <IoIosNotificationsOutline className="w-6 h-6" />
            </button>
          </div>
        
          <div className="flex items-center">
            <p className="text-gray-500 text-sm mr-2">Welcome back, John Doe</p>
            <img
              className="w-10 h-10 rounded-full"
              src="https://via.placeholder.com/150"
              alt="Profile"
            />
          </div>
        </div>
        
        <div className="bg-white">
          <Map />
        </div>
      
        <div className="flex-grow p-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-5 border-b">
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            <div className="p-5">
              <h2 className="mb-5 text-lg font-medium">Overview</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col justify-between p-4 bg-white border rounded-lg shadow-sm hover:shadow-lg">
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Total Vehicles
                    </span>
                    <span className="text-lg font-semibold"> 0</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm font-medium text-gray-500">
                      Offline Vehicles
                    </span>
                    <span className="text-lg font-semibold"> 0</span>
                  </div>
                </div>
                <div className="flex flex-col justify-between p-4 bg-white border rounded-lg shadow-sm hover:shadow-lg">
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Total Drivers
                    </span>
                    <span className="text-lg font-semibold"> {Drivers}</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm font-medium text-gray-500">
                      Inactive Drivers
                    </span>
                    <span className="text-lg font-semibold"> 0</span>
                  </div>
                </div>
                <div className="flex flex-col justify-between p-4 bg-white border rounded-lg shadow-sm hover:shadow-lg">
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Total Alerts
                    </span>
                    <span className="text-lg font-semibold"> 0</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm font-medium text-gray-500">
                      Unresolved Alerts
                    </span>
                    <span className="text-lg font-semibold"> 0</span>
                  </div>
                </div>
                <div className="flex flex-col justify-between p-4 bg-white border rounded-lg shadow-sm hover:shadow-lg">
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Total Trips
                    </span>
                    <span className="text-lg font-semibold"> 0</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm font-medium text-gray-500">
                      Upcoming Trips
                    </span>
                    <span className="text-lg font-semibold"> 0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
