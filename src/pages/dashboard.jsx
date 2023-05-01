//import React from "react";
import { FiMap, FiTruck, FiAlertOctagon } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";
import Map from "../components/map.jsx";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="flex flex-col w-64 bg-white border-r dark:bg-gray-800 dark:border-gray-600">
        <div className="flex items-center justify-center h-16 border-b dark:border-gray-600">
          <a
            to="/"
            className="text-xl font-bold text-gray-800 uppercase dark:text-white"
          >
            Fleet Tracker
          </a>
        </div>
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <nav className="flex-1 space-y-4">
            <a
              to="/"
              className="flex items-center pl-4 py-2 text-gray-600 bg-gray-200 rounded-md dark:text-gray-200 dark:bg-gray-700"
            >
              <FiMap className="w-5 h-5 mr-4" />
              <span className="text-sm font-medium">Map</span>
            </a>
            <a
              to="/vehicles"
              className="flex items-center pl-4 py-2 text-gray-600 rounded-md dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <FiTruck className="w-5 h-5 mr-4" />
              <span className="text-sm font-medium">Vehicles</span>
            </a>
            <a
              to="/drivers"
              className="flex items-center pl-4 py-2 text-gray-600 rounded-md dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <HiOutlineUserGroup className="w-5 h-5 mr-4" />
              <span className="text-sm font-medium">Drivers</span>
            </a>
            <a
              to="/alerts"
              className="flex items-center pl-4 py-2 text-gray-600 rounded-md dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <FiAlertOctagon className="w-5 h-5 mr-4" />
              <span className="text-sm font-medium">Alerts</span>
            </a>
            <a
              to="/calendar"
              className="flex items-center pl-4 py-2 text-gray-600 rounded-md dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <FaRegCalendarAlt className="w-5 h-5 mr-4" />
              <span className="text-sm font-medium">Calendar</span>
            </a>
          </nav>
        </div>
      </div>

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
                    <span className="text-lg font-semibold">12</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm font-medium text-gray-500">
                      Offline Vehicles
                    </span>
                    <span className="text-lg font-semibold">2</span>
                  </div>
                </div>
                <div className="flex flex-col justify-between p-4 bg-white border rounded-lg shadow-sm hover:shadow-lg">
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Total Drivers
                    </span>
                    <span className="text-lg font-semibold">25</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm font-medium text-gray-500">
                      Inactive Drivers
                    </span>
                    <span className="text-lg font-semibold">3</span>
                  </div>
                </div>
                <div className="flex flex-col justify-between p-4 bg-white border rounded-lg shadow-sm hover:shadow-lg">
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Total Alerts
                    </span>
                    <span className="text-lg font-semibold">4</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm font-medium text-gray-500">
                      Unresolved Alerts
                    </span>
                    <span className="text-lg font-semibold">1</span>
                  </div>
                </div>
                <div className="flex flex-col justify-between p-4 bg-white border rounded-lg shadow-sm hover:shadow-lg">
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Total Trips
                    </span>
                    <span className="text-lg font-semibold">50</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm font-medium text-gray-500">
                      Upcoming Trips
                    </span>
                    <span className="text-lg font-semibold">5</span>
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
