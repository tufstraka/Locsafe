{
  /*import { FiEdit } from "react-icons/fi";
import { AiFillCar } from "react-icons/ai";
import { useNavigation } from '../contexts/navigationContext';
import Sidebar from "./sidebar";
import { IoMenu } from 'react-icons/io5';


const Assets = () => {
  const { showNav, toggleNav } = useNavigation();

  return (
    <>
    
    <div className="flex gap-3 mr-3">
    {showNav && <Sidebar/> }
    <button onClick={toggleNav} aria-label="Toggle navigation">
              <IoMenu size={25} />
            </button>
      
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

        <div className="bg-white p-4 rounded-lg shadow mt-2">
          <div className="flex items-center mb-2 ">
            <span className="text-2xl text-green-500 mr-2">
              <FiEdit />
            </span>
            <h2 className="text-xl font-bold">Add asset</h2>
          </div>
          <p className="text-gray-600">
            Click here to add a different kind of asset
          </p>
          <a href='/add/asset'>
          <button className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
            Add
          </button>
          </a>
        </div>



      </div>
    </div>
    </>
  );
};

export default Assets;*/
}
import { FiEdit } from 'react-icons/fi'
import { AiFillCar } from 'react-icons/ai'
import { useNavigation } from '../contexts/navigationContext'
import Sidebar from './sidebar'
import { IoMenu } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const Assets = () => {
  const { showNav, toggleNav } = useNavigation()

  return (
    <div className='flex h-screen'>
      {showNav && <Sidebar />}
      <div className='flex flex-col flex-grow'>
        <div className='flex items-center justify-between px-4 py-3 bg-white shadow-md'>
          <button onClick={toggleNav} aria-label='Toggle navigation'>
            <IoMenu size={25} />
          </button>
          <h1 className='text-xl font-bold'>Asset Management</h1>
          <div></div> {/* Placeholder for additional buttons or actions */}
        </div>

        <div className='flex-grow overflow-y-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4'>
            <div className='bg-white p-4 rounded-lg shadow mt-2'>
              <div className='flex items-center mb-2'>
                <span className='text-2xl text-blue-500 mr-2'>
                  <AiFillCar />
                </span>
                <h2 className='text-xl font-bold'>Register a New Vehicle</h2>
              </div>
              <p className='text-gray-600'>
                Click here to register a new Vehicle in the GPS fleet tracking system.
              </p>
              <Link href='/vehicles/register'>
                <button className='mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded'>
                  Register
                </button>
              </Link>
            </div>

            <div className='bg-white p-4 rounded-lg shadow mt-2'>
              <div className='flex items-center mb-2 '>
                <span className='text-2xl text-green-500 mr-2'>
                  <FiEdit />
                </span>
                <h2 className='text-xl font-bold'>Assign Vehicle</h2>
              </div>
              <p className='text-gray-600'>
                Click here to assign a vehicle to an existing driver in the GPS fleet tracking
                system.
              </p>
              <Link href='/vehicles/assign'>
                <button className='mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded'>
                  Assign
                </button>
              </Link>
            </div>

            <div className='bg-white p-4 rounded-lg shadow mt-2'>
              <div className='flex items-center mb-2 '>
                <span className='text-2xl text-green-500 mr-2'>
                  <FiEdit />
                </span>
                <h2 className='text-xl font-bold'>Add asset</h2>
              </div>
              <p className='text-gray-600'>Click here to add a different kind of asset</p>
              <Link to='/add/asset'>
                <button className='mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded'>
                  Add Asset
                </button>
              </Link>
            </div>

            {/* Additional Asset Management Options */}
            {/* Add more components as needed */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Assets
