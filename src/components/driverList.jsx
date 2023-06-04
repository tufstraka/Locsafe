import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { AiOutlineEdit } from 'react-icons/ai';
import db from '../utils/firebaseInit';
import Sidebar from './sidebar';

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'drivers'));
      //const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setDrivers(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);

  return (
    <div className='flex'>
      <Sidebar/>
      <div className='flex flex-col flex-grow '>  
      <h2 className="text-2xl font-semibold mb-4 text-center">Drivers</h2>
      {drivers.length > 0 ? (
        <ul className="space-y-4">
          {drivers.map((driver) => (
            <li key={driver.formData.id} className="flex items-center space-x-2 p-4 justify-between">
              <span>Name - {driver.formData.name}</span>
              <span>Contact - {driver.formData.contactNumber}</span>
              <button className="flex items-center text-blue-500 hover:text-blue-600">
                <AiOutlineEdit className="mr-1" />
                Update
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No drivers found</p>
      )}
      </div>
    </div>
  );
};

export default DriverList;
