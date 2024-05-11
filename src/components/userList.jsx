import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc } from 'firebase/firestore';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlineEdit, AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'; // Import relevant icons for sorting
import db from '../utils/firebaseInit';
import ConfirmationModal from './confirmation';
import Sidebar from './sidebar';
import { Link } from 'react-router-dom';
import SkeletonLoading from './skeletonloading';

const UserList = () => {
  const [users, setusers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredusers, setFilteredusers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selecteduserId, setSelecteduserId] = useState(null);
  const [sortOrder, setSortOrder] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchusers = async () => {
      const usersCollection = collection(db, 'drivers');
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setusers(usersList);
      setFilteredusers(usersList);
      setIsLoading(false); 
    };

    fetchusers();
  }, []);

  const openModal = (userId) => {
    setSelecteduserId(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmDelete = async () => {
    if (selecteduserId) {
      await handleDeleteuser(selecteduserId);
      closeModal();
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    if (query) {
      const filtered = users.filter((user) =>
        Object.values(user).some((value) =>
          String(value).toLowerCase().includes(query)
        )
      );
      setFilteredusers(filtered);
    } else {
      setFilteredusers(users);
    }
  };

  const handleSort = (field) => {
    const sortedusers = [...filteredusers].sort((a, b) => {
      if (a[field] < b[field]) return sortOrder === 'asc' ? -1 : 1; // Adjust sorting based on sortOrder
      if (a[field] > b[field]) return sortOrder === 'asc' ? 1 : -1; // Adjust sorting based on sortOrder
      return 0;
    });
    setFilteredusers(sortedusers);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sortOrder after sorting
  };

  const handleDeleteuser = async (userId) => {
    await deleteDoc(doc(db, 'drivers', userId));
    fetchusers(); 
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-semibold text-center mb-4">User Management</h2>
            <div className="flex justify-center mb-4">
              <input
                className="form-input px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-indigo-300"
                type="text"
                placeholder="Search users"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            {isLoading ? (
              // Display skeleton loading while data is being fetched
              <SkeletonLoading />
            ) : (
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                            Name <span className="ml-1 transition-colors duration-300 inline-block transform" style={{ color: sortOrder ? '#4f46e5' : '#6b7280' }}>
                              {sortOrder === 'asc' ? <AiOutlineArrowUp /> : sortOrder === 'desc' ? <AiOutlineArrowDown /> : null}
                            </span>
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('contactNumber')}>
                            Contact Number <span className="ml-1 transition-colors duration-300 inline-block transform" style={{ color: sortOrder ? '#4f46e5' : '#6b7280' }}>
                              {sortOrder === 'asc' ? <AiOutlineArrowUp /> : sortOrder === 'desc' ? <AiOutlineArrowDown /> : null}
                            </span>
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('drivingLicenceNumber')}>
                            License Number <span className="ml-1 transition-colors duration-300 inline-block transform" style={{ color: sortOrder ? '#4f46e5' : '#6b7280' }}>
                              {sortOrder === 'asc' ? <AiOutlineArrowUp /> : sortOrder === 'desc' ? <AiOutlineArrowDown /> : null}
                            </span>
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Edit</span>
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Delete</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredusers.map((user) => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{user.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{user.contactNumber}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{user.drivingLicenceNumber}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Link to={`/users/${user.id}/edit`} className="text-indigo-600 hover:text-indigo-900">
                                <AiOutlineEdit />
                              </Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button onClick={() => openModal(user.id)} className="text-red-600 hover:text-red-900">
                                <RiDeleteBin6Line />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {filteredusers.length === 0 && (
                      <div className="text-center py-4">
                        <p className="text-sm text-gray-500">No users found.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
      <ConfirmationModal isOpen={isModalOpen} onClose={closeModal} onConfirm={confirmDelete}>
        Are you sure you want to delete this user?
      </ConfirmationModal>
    </div>
  );
};

export default UserList;




