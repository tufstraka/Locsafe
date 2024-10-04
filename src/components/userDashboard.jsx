import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { collection, setDoc, GeoPoint } from "firebase/firestore";
import { db } from "../utils/firebaseInit";

const UserDashboard = () => {
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentLocations, setRecentLocations] = useState([]); // Added state for recent locations
  
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const getLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setLocationData({ latitude, longitude });
            
            const location = new GeoPoint(latitude, longitude);
            const collectionRef = collection(db, "locations");
            const documentRef = doc(collectionRef, user.displayName);

            // Get the existing location data from Firestore
            const documentSnapshot = await getDoc(documentRef);
            const existingData = documentSnapshot.exists()
              ? documentSnapshot.data().recentLocations || [] // Safeguard to avoid undefined
              : [];

            // Update the location data array with the new coordinates
            const updatedRecentLocations = [...existingData, { location }];
            await setDoc(documentRef, { recentLocations: updatedRecentLocations });
            
            console.log("Location updated!", updatedRecentLocations);
            setRecentLocations(updatedRecentLocations); // Update recent locations state
            setLoading(false);
          },
          (error) => {
            setError("Error getting location: " + error.message);
            setLoading(false);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
        setLoading(false);
      }
    };

    getLocation(); // Get initial location

    const interval = setInterval(() => {
      getLocation(); // Fetch location every 5 seconds
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []); // Empty dependency array to run once on mount

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
        {loading ? (
          <p className="text-gray-600">Loading your location...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p className="text-gray-600 mb-6">
            Your current location: {locationData.latitude.toFixed(4)}, {locationData.longitude.toFixed(4)}
          </p>
        )}
        
        <p className="text-lg text-gray-700 mb-4">Welcome back, {user.displayName}!</p>
        
        <Link to="/user/profile" className="block mb-4">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow">
            Update Your Profile
          </button>
        </Link>

        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow mb-4">
          Send Location Data
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-2">Recent Locations:</h2>
        <div className="border rounded-lg p-4 bg-gray-100">
          {recentLocations.length > 0 ? (
            recentLocations.map((loc, index) => (
              <p key={index}>
                Latitude: {loc.location.latitude}, Longitude: {loc.location.longitude}
              </p>
            ))
          ) : (
            <p>No recent locations available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

