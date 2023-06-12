import { useState } from "react";
import { collection, addDoc } from "firebase/firestore"; 
import db from "../utils/firebaseInit";

const DispatcherReg = () => {
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    drivingLicenceNumber: "",
    workSchedule: "",
    drivingHistory: "",
    certifications: "",
    trainingRecords: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add to firestore
    try {
      const docRef = await addDoc(collection(db , "dispatchers"), {formData});

      console.log('Document written with ID: ', docRef.id);
      
      // Clear the form after successful submission
      setFormData({
        name: "",
        contactNumber: "",
        drivingLicenceNumber: "",
        workSchedule: "",
        drivingHistory: "",
        certifications: "",
        trainingRecords: "",
      });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
    console.log(formData);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Dispatcher Registration</h2>
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
            className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
            placeholder="Enter your name"
            value={formData.name}
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
            className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
            placeholder="Enter your contact number"
            value={formData.contactNumber}
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
            className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
            placeholder="Enter your driving licence number"
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
            className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
            placeholder="Enter your work schedule"
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
            className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
            placeholder="Enter your driving history"
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
            className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
            placeholder="Enter your certifications"
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
            className="border border-gray-300 rounded px-3 py-2 mt-1 w-full"
            placeholder="Enter your training records"
            value={formData.trainingRecords}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default DispatcherReg;
