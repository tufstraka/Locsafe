import { useState } from "react";
import { collection, doc, setDoc } from "firebase/firestore";
//import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Sidebar from './sidebar'
import db from "../utils/firebaseInit";
//import auth from "../utils/firebaseInit";
import successIcon from "../assets/check.png"; // Replace with your success icon


const DriverReg = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    contactNumber: "",
    drivingLicenceNumber: "",
    workSchedule: "",
    drivingHistory: "",
    certifications: "",
    trainingRecords: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const collectionRef = collection(db, "drivers");
      const documentRef = doc(collectionRef, formData.username);

      await setDoc(documentRef, formData).then(() => {
        console.log("Document successfully written!");
      });

      //console.log('Document saved successfully', newdoc);
      //const docRef = await addDoc(collection(db , "drivers"), {formData});

      //console.log("Document written with ID: ", docRef.id);

      

      setTimeout(() => {
        setIsSuccess(true);
        setIsSaving(false);
        // Clear the form after successful submission
        setFormData({
          name: "",
          username: "",
          email: "",
          password: "",
          contactNumber: "",
          drivingLicenceNumber: "",
          workSchedule: "",
          drivingHistory: "",
          certifications: "",
          trainingRecords: "",
        });
      }, 3000); // Reset success message after 3 seconds
    } catch (error) {
      console.error("Error adding document: ", error);
      setIsSaving(false);
    }
    //console.log(formData);
  };

  return (
    <div className="flex">
    <Sidebar/>  
    <div className="flex-grow p-4">
    <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Driver Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="contactNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Contact Number
          </label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="drivingLicenceNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Driving Licence Number
          </label>
          <input
            type="text"
            id="drivingLicenceNumber"
            name="drivingLicenceNumber"
            className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.drivingLicenceNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="workSchedule"
            className="block text-sm font-medium text-gray-700"
          >
            Work Schedule
          </label>
          <input
            type="text"
            id="workSchedule"
            name="workSchedule"
            className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.workSchedule}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="drivingHistory"
            className="block text-sm font-medium text-gray-700"
          >
            Driving History (Previous Work Experience)
          </label>
          <textarea
            id="drivingHistory"
            name="drivingHistory"
            rows="4"
            className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.drivingHistory}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="certifications"
            className="block text-sm font-medium text-gray-700"
          >
            Certifications
          </label>
          <input
            type="text"
            id="certifications"
            name="certifications"
            className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.certifications}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="trainingRecords"
            className="block text-sm font-medium text-gray-700"
          >
            Training Records
          </label>
          <input
            type="text"
            id="trainingRecords"
            name="trainingRecords"
            className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.trainingRecords}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-6 py-3 bg-blue-600 border border-transparent rounded-md font-semibold text-white tracking-widest hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:bg-blue-700 transition ease-in-out duration-150"
          disabled={isSaving || formData.username === "" || formData.password === ""}
          >
        {isSaving ? "Saving..." : "Register"}        
        </button>
      </form>

      {isSuccess && (
            <div className="flex items-center mt-4">
              <img src={successIcon} alt="Success" className="w-6 h-6 mr-2" />
              <p className="text-green-600">Driver added successfully!</p>
            </div>
          )}
      </div>
    </div>
  </div>
  );
};

export default DriverReg;




//const collectionRef = collection(db, "drivers");
      //const documentRef = doc(collectionRef, formData.username);
      //const newdoc =  await setDoc(documentRef, formData);

      //console.log('Document written with ID: ', newdoc.id);*/