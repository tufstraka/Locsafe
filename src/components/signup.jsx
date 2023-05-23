import { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import './signup.css';

const DriverSignUpForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // send data to server or perform form validation
  };

  return (
    <div className="driverbg">
    <form className="w-full max-w-sm mx-auto mt-8" onSubmit={handleSubmit}>
      <div className="mb-6">
        <label
          className="block mb-2 text-gray-700 font-bold text-lg"
          htmlFor="full-name"
        >
          Full Name
        </label>
        <div className="flex items-center border-b border-gray-500 py-2">
          <FaUser className="mr-3" />
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            id="full-name"
            type="text"
            placeholder="John Doe"
            value={fullName}
            onChange={handleFullNameChange}
          />
        </div>
      </div>
      <div className="mb-6">
        <label
          className="block mb-2 text-gray-700 font-bold text-lg"
          htmlFor="email"
        >
          Email Address
        </label>
        <div className="flex items-center border-b border-gray-500 py-2">
          <FaEnvelope className="mr-3" />
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            id="email"
            type="email"
            placeholder="john.doe@example.com"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
      </div>
      <div className="mb-6">
        <label
          className="block mb-2 text-gray-700 font-bold text-lg"
          htmlFor="password"
        >
          Password
        </label>
        <div className="flex items-center border-b border-gray-500 py-2">
          <FaLock className="mr-3" />
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            id="password"
            type="password"
            placeholder="**********"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign Up
        </button>
      </div>
    </form>
    </div>
  );
};

export default DriverSignUpForm;

