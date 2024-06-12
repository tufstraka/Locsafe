import { FiUserPlus, FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNavigation } from '../contexts/navigationContext';
import Sidebar from "./sidebar";
import { IoMenu } from 'react-icons/io5';

const Staff = () => {
  const { showNav, toggleNav } = useNavigation();

  return (
    <div className="flex h-screen">
      {showNav && <Sidebar />}
      <div className="flex flex-col flex-grow">
        <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md">
          <button onClick={toggleNav} aria-label="Toggle navigation">
            <IoMenu size={25} />
          </button>
          <h1 className="text-xl font-bold">Staff Management</h1>
          <div></div> {/* Placeholder for additional buttons or actions */}
        </div>

        <div className="flex-grow overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <div className="bg-white p-4 rounded-lg shadow mt-2">
              <div className="flex items-center mb-2">
                <span className="text-2xl text-blue-500 mr-2">
                  <FiUserPlus />
                </span>
                <h2 className="text-xl font-bold">Register a New User</h2>
              </div>
              <p className="text-gray-600">
                Click here to register a new user in the GPS fleet tracking
                system.
              </p>
              <Link to="/user/register">
                <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                  Register
                </button>
              </Link>
            </div>

            <div className="bg-white p-4 rounded-lg shadow mt-2">
              <div className="flex items-center mb-2 ">
                <span className="text-2xl text-green-500 mr-2">
                  <FiEdit />
                </span>
                <h2 className="text-xl font-bold">Update User Details</h2>
              </div>
              <p className="text-gray-600">
                Click here to update the details of an existing user in the GPS
                fleet tracking system.
              </p>
              <Link to='/users/update'>
                <button className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
                  Update
                </button>
              </Link>
            </div>

            {/* Additional Staff Management Options */}
            {/* Add more components as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staff;

