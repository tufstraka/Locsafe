import { useState, useEffect } from 'react';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { IoMenu } from 'react-icons/io5';
import { getDocs, collection } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../utils/firebaseInit';
import { BsPersonFill, BsPeopleFill } from 'react-icons/bs';
import {GiCargoShip} from 'react-icons/gi';
import Card from "../components/card";
import Map from '../components/map.jsx';
import Sidebar from '../components/sidebar.jsx';
import { useNavigation } from '../contexts/navigationContext';
//import ShipmentsContainer from "../components/shipments-container";


const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(0);
  const { showNav, toggleNav } = useNavigation();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'drivers'));
        setUsers(querySnapshot.docs.length);
      } catch (error) {
        console.error('Error fetching users: ', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='flex h-screen'>
      {showNav && <Sidebar />}
      <div className='flex flex-col flex-grow'>
        <div className='flex items-center justify-between px-4 py-3 bg-white shadow-md'>
          <button onClick={toggleNav} aria-label='Toggle navigation'>
            <IoMenu size={25} />
          </button>
          <button
            className='text-gray-600 hover:text-gray-800 transition-colors duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500'
            aria-label='Notifications'
          >
            <IoIosNotificationsOutline className='w-6 h-6' />
          </button>
          <div className='flex items-center'>
            <p className='text-gray-600 text-sm mr-2'>
              Welcome back, {user ? user.email : 'Guest'}
            </p>
            <img
              className='w-8 h-8 rounded-full'
              src={user?.photoURL || 'https://via.placeholder.com/150'}
              alt='Profile'
            />
          </div>
        </div>

        <section className="flex justify-between flex-wrap mt-2">
        <Card 
          bgHover='hover:bg-blue-600 dark:hover:bg-blue-800'
          textHover='hover:text-white'
          heading='Registered customers'
          number='380.2k'
          joined='3467 Joined'
          iconbg='bg-blue-600 dark:bg-blue-800'
          icon={<BsPersonFill/>} 
        />

        <Card 
          bgHover='hover:bg-teal-500 dark:hover:bg-teal-700'
          textHover='hover:text-white'
          heading='Registered transporters'
          number='15.6m'
          joined='3467 Onboarded'
          iconbg='bg-teal-500 dark:bg-teal-700'
          icon={<BsPeopleFill/>}
        />

        <Card 
          bgHover='hover:bg-pink-500 dark:hover:bg-pink-700'
          textHover='hover:text-white'
          heading='Total shipments'
          number='348.9k'
          joined='3467 Shipped'
          iconbg='bg-pink-500 dark:bg-pink-700'
          icon={<GiCargoShip/>}
        />
      </section>

        <div className='flex-grow overflow-y-auto'>
          {/*<ShipmentsContainer/>*/}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4'>
            {/* Map and stats */}
            <div className='bg-white rounded-lg shadow-md p-4'>
              <Map />
              <div className='bg-white rounded-lg shadow-md mt-4'>
                <div className='p-5'>
                  <h2 className='mb-4 text-lg font-medium text-gray-800'>Overview</h2>
                  <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                    {/* Cards */}
                    {[
                      { title: 'Total Assets', value: '0' },
                      { title: 'Total Users', value: users },
                      { title: 'Total Alerts', value: '0' },
                      { title: 'Total Trips', value: '0' },
                    ].map((card, index) => (
                      <div
                        key={index}
                        className='flex flex-col justify-between p-4 bg-white border rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200'
                      >
                        <div>
                          <span className='text-sm font-medium text-gray-600'>{card.title}</span>
                          <span className='block text-lg font-semibold text-gray-800'>
                            {card.value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Alerts */}
            <div className='bg-white rounded-lg shadow-md p-4'>
              <h2 className='mb-4 text-lg font-medium text-gray-800'>Recent Alerts</h2>
              {/* Alert list */}
              <ul className='divide-y divide-gray-200'>
                <li className='py-4'>
                  <div className='flex items-center space-x-4'>
                    <div className='flex-shrink-0'>
                      <svg
                        className='h-5 w-5 text-red-500'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                      >
                        <path
                          fillRule='evenodd'
                          d='M10 1a1 1 0 00-1 1v7a1 1 0 102 0V2a1 1 0 00-1-1zm7.71 4.29a1 1 0 00-1.42-1.42l-6 6a1 1 0 01-1.42 0L5 8.41a1 1 0 00-1.42 1.42l4.29 4.3a1 1 0 001.42 0l7-7z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='text-sm font-medium text-gray-900 truncate'>
                        Engine Malfunction Alert
                      </p>
                      <p className='text-sm text-gray-500'>
                        #345 - Vehicle ID: ABC123 - Driver: John Doe
                      </p>
                    </div>
                    <div className='flex-shrink-0'>
                      <time dateTime='2021-01-22T00:00:00'>1d ago</time>
                    </div>
                  </div>
                </li>
                {/* More alert items */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

