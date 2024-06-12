import { useState } from 'react';
import { db } from '../utils/firebaseInit';
import { collection, addDoc } from 'firebase/firestore';
import Sidebar from './sidebar';

const AssetForm = () => {
  const [assetID, setAssetID] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate inputs
    if (!assetID || !name || !type || !location || !status) {
      setError('All fields are required.');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'assets'), {
        assetID,
        name,
        type,
        location,
        status,
        timestamp: new Date(),
      });
      setSuccess('Asset added successfully!');
      // Clear form
      setAssetID('');
      setName('');
      setType('');
      setLocation('');
      setStatus('');
    } catch (e) {
      console.error('Error adding document: ', e);
      setError('Error adding asset. Please try again.');
    }
  };

  return (
    <>
    <div className="flex gap-3 mr-3">
    <Sidebar/>  
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add New Asset</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="assetID" className="block text-gray-700">Asset ID</label>
          <input
            type="text"
            id="assetID"
            value={assetID}
            onChange={(e) => setAssetID(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-700">Type</label>
          <input
            type="text"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Asset
        </button>
      </form>
    </div>
    </div>
    </>
  );
};

export default AssetForm;
