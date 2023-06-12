import { FiMap, FiTruck, FiAlertOctagon } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsFillGeoFill } from "react-icons/bs";

const Sidebar = () => {
  return (
    <div className="flex h-screen flex-col w-64 bg-white border-r dark:bg-gray-800 dark:border-gray-600">
    <div className="flex items-center justify-center h-16 border-b dark:border-gray-600">
      <a
        href="/"
        className="text-xl font-bold text-gray-800 uppercase dark:text-white"
      >
        Locsafe ™
      </a>
    </div>
    <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
      <nav className="flex-1 space-y-4">
        <a
          href="/dashboard"
          className="flex items-center pl-4 py-2 text-gray-600 bg-gray-200 rounded-md dark:text-gray-200 dark:bg-gray-700"
        >
          <FiMap className="w-5 h-5 mr-4" />
          <span className="text-sm font-medium">Map</span>
        </a>
        <a
          href="/vehicles"
          className="flex items-center pl-4 py-2 text-gray-600 rounded-md dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <FiTruck className="w-5 h-5 mr-4" />
          <span className="text-sm font-medium">Vehicles</span>
        </a>
        <a
          href="/staff"
          className="flex items-center pl-4 py-2 text-gray-600 rounded-md dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <HiOutlineUserGroup className="w-5 h-5 mr-4" />
          <span className="text-sm font-medium">Staff</span>
        </a>
        <a
          href="/alerts"
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
        <a
          to="/calendar"
          className="flex items-center pl-4 py-2 text-gray-600 rounded-md dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <BsFillGeoFill className="w-5 h-5 mr-4" />
          <span className="text-sm font-medium">Geofences</span>
        </a>
      </nav>
  
    </div>
  </div>
  )
}

export default Sidebar