import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import db from "../utils/firebaseInit";
import Sidebar from "./sidebar";
import { Link } from "react-router-dom";

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDrivers, setFilteredDrivers] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);

    const filtered = drivers.filter((driver) => {
      const name = driver.name.toLowerCase();
      const contactNumber = driver.contactNumber.toLowerCase();
      const drivingLicenceNumber = driver.drivingLicenceNumber.toLowerCase();
      const lowerQuery = query.toLowerCase();

      return (
        name.includes(lowerQuery) ||
        contactNumber.includes(lowerQuery) ||
        drivingLicenceNumber.includes(lowerQuery)
      );
    });

    setFilteredDrivers(filtered);
  };

  const fetchDrivers = async () => {
    const driversCollection = collection(db, "drivers");
    const driversSnapshot = await getDocs(driversCollection);
    const driversData = driversSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setDrivers(driversData);
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  console.log(drivers);

  const updateDriver = async (driverId, updatedData) => {
    const driverRef = doc(db, "drivers", driverId);
    await updateDoc(driverRef, updatedData);
  };

  const handleUpdateName = async (driverId, newName) => {
    await updateDriver(driverId, { name: newName });
    fetchDrivers(); // Refresh the drivers list after the update
  };

  const handleUpdateContact = async (driverId, newNumber) => {
    await updateDriver(driverId, { contactNumber: newNumber });
    fetchDrivers(); // Refresh the drivers list after the update
  };

  const handleUpdateLicense = async (driverId, newLicence) => {
    await updateDriver(driverId, { drivingLicenceNumber: newLicence });
    fetchDrivers(); // Refresh the drivers list after the update
  };

  const handleDeleteDriver = async (driverId) => {
    await deleteDoc(doc(db, "drivers", driverId));
    fetchDrivers(); // Refresh the drivers list after deletion
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-grow ">
        <h2 className="text-2xl font-semibold justify-center m-3 text-center">
          Drivers
        </h2>
        <hr className="border-2 border-gray-300" />
        <input
          //className="border border-gray-300 rounded-md p-2 m-4 text-center"
          className="py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-200 text-center m-4"
          type="text"
          placeholder="Search drivers"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />

        {searchQuery ? (
          filteredDrivers.length > 0 ? (
            <ul className="space-y-4">
              {filteredDrivers.map((driver) => (
                <li
                  key={driver.id}
                  className="flex items-center space-x-2 p-4 justify-between bg-blue-50 m-4"
                >
                  <span>
                    {" "}
                    <span className="font-bold">Name</span>: {driver.name}
                  </span>
                  <span>
                    {" "}
                    <span className="font-bold">Contact</span>:{" "}
                    {driver.contactNumber}
                  </span>
                  <span>
                    {" "}
                    <span className="font-bold">License</span>:{" "}
                    {driver.drivingLicenceNumber}
                  </span>
                  <button className="flex items-center text-blue-500 hover:text-blue-600">
                    <AiOutlineEdit className="mr-1" />
                    Update
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="flex align-middle justify-center">
              No drivers found.
            </p>
          )
        ) : drivers.length > 0 ? (
          <ul className="space-y-4">
            {drivers.map((driver) => (
              <li
                key={driver.id}
                className="flex items-center space-x-2 p-4 justify-between bg-blue-50 m-4"
              >
                <span>
                  {" "}
                  <span className="font-bold">Name</span>:
                  <input
                    type="text"
                    value={driver.name}
                    className="w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) =>
                      handleUpdateName(driver.id, e.target.value)
                    }
                  />
                </span>
                <span>
                  {" "}
                  <span className="font-bold">Contact</span>:{" "}
                  <input
                    type="text"
                    value={driver.contactNumber}
                    className="w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) =>
                      handleUpdateContact(driver.id, e.target.value)
                    }
                  />
                </span>
                <span>
                  {" "}
                  <span className="font-bold">License</span>:{" "}
                  <input
                    type="text"
                    value={driver.drivingLicenceNumber}
                    className="w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) =>
                      handleUpdateLicense(driver.id, e.target.value)
                    }
                  />
                </span>
                <button
                  onClick={() => handleDeleteDriver(driver.id)}
                  className="flex items-center text-red-500 hover:text-red-600"
                >
                  <RiDeleteBin6Line />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="flex align-middle justify-center">Loading</p>
        )}
      </div>
    </div>
  );
};

export default DriverList;
