import { FiEdit } from "react-icons/fi";
import { AiFillCar } from "react-icons/ai";
import Sidebar from "./sidebar";

const Vehicles = () => {
  return (
    <>
    
    <div className="flex gap-3 mr-3">
    <Sidebar/>  
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow mt-2">
          <div className="flex items-center mb-2">
            <span className="text-2xl text-blue-500 mr-2">
              <AiFillCar/>
            </span>
            <h2 className="text-xl font-bold">Register a new Vehicle</h2>
          </div>
          <p className="text-gray-600">
            Click here to register a new Vehicle in the GPS fleet tracking
            system.
          </p>
          <a href="/vehicles/register">
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
            <h2 className="text-xl font-bold">Assign Vehicle</h2>
          </div>
          <p className="text-gray-600">
            Click here to assign a vehicle to an existing driver in the GPS
            fleet tracking system.
          </p>
          <a href='/vehicles/assign'>
          <button className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
            Assign
          </button>
          </a>
        </div>



      </div>
    </div>
    </>
  );
};

export default Vehicles;
