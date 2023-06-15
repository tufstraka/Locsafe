import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
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
      const name = driver.formData.name.toLowerCase();
      const contactNumber = driver.formData.contactNumber.toLowerCase();
      const drivingLicenceNumber =
        driver.formData.drivingLicenceNumber.toLowerCase();
      const lowerQuery = query.toLowerCase();

      return (
        name.includes(lowerQuery) ||
        contactNumber.includes(lowerQuery) ||
        drivingLicenceNumber.includes(lowerQuery)
      );
    });

    setFilteredDrivers(filtered);
  };

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "drivers"));
      //const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setDrivers(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    fetchData();
  }, []);

  console.log(drivers);


  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-grow ">
        <h2 className="text-2xl font-semibold justify-center m-3 text-center">Drivers</h2>
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
                    <span className="font-bold">Name</span>:{" "}
                    {driver.name}
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
            <p className="flex align-middle justify-center">No drivers found.</p>
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
                  <span className="font-bold">Name</span>:{" "}
                  {driver.name}
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
                <Link to={`/update/${driver.id}`}>
                <button className="flex items-center text-blue-500 hover:text-blue-600">
                  <AiOutlineEdit className="mr-1" />
                  Update
                </button>
                </Link>
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
