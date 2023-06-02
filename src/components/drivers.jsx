import { FiUserPlus, FiEdit } from "react-icons/fi";

const Drivers = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">GPS Fleet Tracking System</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
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
        <div className="bg-white p-4 rounded-lg shadow">
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
        {/* Add more components as needed */}
      </div>
    </div>
  );
};

export default Drivers;
