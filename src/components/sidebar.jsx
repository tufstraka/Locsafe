// components/Sidebar.jsx
import { FiMap, FiTruck, FiAlertOctagon, FiBarChart2, FiSettings, FiUsers } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaRegCalendarAlt, FaTools, FaRegBell } from "react-icons/fa";
import { BsFillGeoFill, BsFileEarmarkText } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useNavigation } from '../contexts/navigationContext';

const Sidebar = () => {
  const { toggleNav } = useNavigation();

  return (
    <div className="flex flex-col w-64 bg-white border-r dark:bg-gray-800 dark:border-gray-600 max-sm:absolute max-sm:z-10 max-sm:h-[100%]">
      <div className="flex items-center justify-between px-4 h-16 border-b dark:border-gray-600">
        <Link
          to="/"
          className="text-xl font-bold text-gray-800 uppercase dark:text-white"
        >
          Locsafe ™
        </Link>
        <span>
          <IoClose size={20} color="white" className="cursor-pointer" onClick={toggleNav}/>
        </span>
      </div>
      <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        <nav className="flex-1 space-y-4">
          <Link
            to="/admin/dashboard"
            className="flex items-center pl-4 py-2 text-gray-600 bg-gray-200 rounded-md dark:text-gray-200 dark:bg-gray-700"
          >
            <FiMap className="w-5 h-5 mr-4" />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <Link
            to="/assets"
            className="flex items-center pl-4 py-2 text-gray-600 rounded-md dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FiTruck className="w-5 h-5 mr-4" />
            <span className="text-sm font-medium">Assets</span>
          </Link>
          <Link
            to="/staff"
            className="flex items-center pl-4 py-2 text-gray-600 rounded-md dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <HiOutlineUserGroup className="w-5 h-5 mr-4" />
            <span className="text-sm font-medium">Staff</span>
          </Link>
          <Link
            to="/alerts"
            className="flex items-center pl-4 py-2 text-gray-600 rounded-md dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FiAlertOctagon className="w-5 h-5 mr-4" />
            <span className="text-sm font-medium">Alerts</span>
          </Link>
          <Link
            to="/calendar"
            className="flex items-center pl-4 py-2 text-gray-600 rounded-md dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FaRegCalendarAlt className="w-5 h-5 mr-4" />
            <span className="text-sm font-medium">Calendar</span>
          </Link>
          <Link
            to="/geofence"
            className="flex items-center pl-4 py-2 text-gray-600 rounded-md dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <BsFillGeoFill className="w-5 h-5 mr-4" />
            <span className="text-sm font-medium">Geofences</span>
          </Link>
          <Link
            to="/insights"
            className="flex items-center pl-4 py-2 text-gray-600 rounded-md dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FiBarChart2 className="w-5 h-5 mr-4" />
            <span className="text-sm font-medium">Insights</span>
          </Link>
          <Link
            to="/maintenance"
            className="flex items-center pl-4 py-2 text-gray-600 rounded-md dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FaTools className="w-5 h-5 mr-4" />
            <span className="text-sm font-medium">Maintenance</span>
          </Link>
          <Link
            to="/reports"
            className="flex items-center pl-4 py-2 text-gray-600 rounded-md dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <BsFileEarmarkText className="w-5 h-5 mr-4" />
            <span className="text-sm font-medium">Reports</span>
          </Link>
          <Link
            to="/notifications"
            className="flex items-center pl-4 py-2 text-gray-600 rounded-md dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FaRegBell className="w-5 h-5 mr-4" />
            <span className="text-sm font-medium">Notifications</span>
          </Link>
          <Link
            to="/settings"
            className="flex items-center pl-4 py-2 text-gray-600 rounded-md dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FiSettings className="w-5 h-5 mr-4" />
            <span className="text-sm font-medium">Settings</span>
          </Link>
          <Link
            to="/users"
            className="flex items-center pl-4 py-2 text-gray-600 rounded-md dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FiUsers className="w-5 h-5 mr-4" />
            <span className="text-sm font-medium">User Management</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
