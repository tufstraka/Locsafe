import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
//import { doc, getDoc } from "firebase/firestore";
//import db from "../utils/firebaseInit";
import { collection, doc, setDoc, getDoc, GeoPoint } from "firebase/firestore";
import db from "../utils/firebaseInit";

const DriverDashboard = ({ username }) => {
  const [locationData, setLocationData] = useState(null);

  //const userNameRef = doc(db, `drivers/${username}`);
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user);


  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocationData({ latitude, longitude });
          const location = new GeoPoint(locationData.latitude, locationData.longitude);
          console.log(location);
          const collectionRef = collection(db, "locations");
          const documentRef = doc(collectionRef, user.displayName);
          
          // Get the existing location data from Firestore
          const documentSnapshot = await getDoc(documentRef);
          const existingData = documentSnapshot.exists()
            ? documentSnapshot.data().recentLocations
            : [];

          // Update the location data array with the new coordinates
          const recentLocations = [...existingData, { location }];

          // Update the document with the updated location data
          await setDoc(documentRef, { recentLocations });
          console.log("Location updated!", recentLocations);
          //console.log(locationData);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getLocation();
    }, 5000);

    return () => clearInterval(interval);
  });

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-md mx-auto bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Driver Dashboard</h1>
        <p className="mb-6">Welcome {user.displayName}</p>
        {/* className="mb-6">Your current location is: {locationData.latitude}</p> */}

        <Link
          to="/driver/profile"
          className="text-blue-500 hover:text-blue-600"
        >
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 m-3 rounded shadow mb-6">
            Update your Profile
          </button>
        </Link>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow mb-6">
          Send Location Data
        </button>
        {/* Rest of the dashboard content */}
      </div>
    </div>
  );
};

export default DriverDashboard;
