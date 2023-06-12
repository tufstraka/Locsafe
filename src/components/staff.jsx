import { FiUserPlus, FiEdit } from "react-icons/fi";
import Sidebar from "./sidebar";

const Staff = () => {
  return (
    <>
    
    <div className="flex gap-3 mr-3">
    <Sidebar/>  
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow mt-2">
          <div className="flex items-center mb-2">
            <span className="text-2xl text-blue-500 mr-2">
              <FiUserPlus />
            </span>
            <h2 className="text-xl font-bold">Register a new Driver</h2>
          </div>
          <p className="text-gray-600">
            Click here to register a new driver in the GPS fleet tracking
            system.
          </p>
          <a href="/drivers/register">
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Register
            </button>
          </a>
        </div>

        
        <div className="bg-white p-4 rounded-lg shadow mt-2">
          <div className="flex items-center mb-2 ">
            <span className="text-2xl text-green-500 mr-2">
              <FiEdit />
            </span>
            <h2 className="text-xl font-bold">Update Driver Details</h2>
          </div>
          <p className="text-gray-600">
            Click here to update the details of an existing driver in the GPS
            fleet tracking system.
          </p>
          <a href='/drivers/update'>
          <button className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
            Update
          </button>
          </a>
        </div>
    

        <div className="bg-white p-4 rounded-lg shadow mt-2">
          <div className="flex items-center mb-2">
            <span className="text-2xl text-blue-500 mr-2">
              <FiUserPlus />
            </span>
            <h2 className="text-xl font-bold">Register a new Dispatcher</h2>
          </div>
          <p className="text-gray-600">
            Click here to register a new dispatcher in the GPS fleet tracking
            system.
          </p>
          <a href="/dispatchers/register">
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Register
            </button>
          </a>
        </div>

        <div className="bg-white p-4 rounded-lg shadow mt-2">
          <div className="flex items-center mb-2">
            <span className="text-2xl text-green-500 mr-2">
              <FiEdit />
            </span>
            <h2 className="text-xl font-bold">Update Dispatcher Details</h2>
          </div>
          <p className="text-gray-600">
            Click here to update the details of an existing dispatcher in the GPS
            fleet tracking system.
          </p>
          <a href='/dispatchers/update'>
          <button className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
            Update
          </button>
          </a>
        </div>

        <div className="bg-white p-4 rounded-lg shadow mt-2">
          <div className="flex items-center mb-2">
            <span className="text-2xl text-blue-500 mr-2">
              <FiUserPlus />
            </span>
            <h2 className="text-xl font-bold">Register a new Driver</h2>
          </div>
          <p className="text-gray-600">
            Click here to register a new driver in the GPS fleet tracking
            system.
          </p>
          <a href="/drivers/register">
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Register
            </button>
          </a>
        </div>

        <div className="bg-white p-4 rounded-lg shadow mt-2">
          <div className="flex items-center mb-2">
            <span className="text-2xl text-green-500 mr-2">
              <FiEdit />
            </span>
            <h2 className="text-xl font-bold">Update Driver Details</h2>
          </div>
          <p className="text-gray-600">
            Click here to update the details of an existing driver in the GPS
            fleet tracking system.
          </p>
          <button className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
            Update
          </button>
        </div>


      </div>
    </div>
    </>
  );
};

export default Staff;
