import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Header from './header';
import Footer from './footer';
import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider
} from "firebase/auth";

const auth = getAuth();
setPersistence(auth, browserSessionPersistence);

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    countryCode: '',
    country: '',
  });

  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [showSelect, setShowSelect] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data.map((country) => country.name.common));
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleEmailSignUp = async () => {
    try {
      const { email, password } = formData;
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed up with email and password successfully!');
    } catch (error) {
      console.error('Error signing up with email and password:', error);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log('User signed up with Google successfully!');
    } catch (error) {
      console.error('Error signing up with Google:', error);
    }
  };

  const handleMicrosoftSignUp = async () => {
    try {
      const provider = new OAuthProvider('microsoft.com');
      await signInWithPopup(auth, provider);
      console.log('User signed up with Microsoft successfully!');
    } catch (error) {
      console.error('Error signing up with Microsoft:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    handleEmailSignUp();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    filterCountries(value);
    setShowSelect(true);
  };

  const filterCountries = (search) => {
    const filtered = countries.filter(country =>
      country.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleSelectCountry = (selectedCountry) => {
    setFormData((prevState) => ({
      ...prevState,
      country: selectedCountry,
    }));
    setShowSelect(false);
  };

  return (
    <div>
      <Helmet>
        <title>Locsafe™ - Registration</title>
        <meta
          name="description"
          content="Register your business with us."
        />
      </Helmet>
      <Header />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 sm:max-w-xl lg:max-w-2xl mt-40 mb-20">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-semibold mb-2 text-white">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-semibold mb-2 text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="mb-4 sm:mb-0">
                <label htmlFor="countryCode" className="block font-semibold mb-2 text-white">
                  Country Code
                </label>
                <input
                  type="text"
                  id="countryCode"
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., +254"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="phoneNumber" className="block font-semibold mb-2 text-white">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="country" className="block font-semibold mb-2 text-white">
                Country
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Start typing"
                />
                {showSelect && (
                  <div className="absolute z-10 inset-x-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-300">
                    <ul className="py-1 overflow-auto max-h-40">
                      {filteredCountries.map((country) => (
                        <li
                          key={country}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                          onClick={() => handleSelectCountry(country)}
                        >
                          {country}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gray-800 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white transition ease-in duration-200 rounded-lg text-xl font-semibold"
            >
              Sign Up
            </button>
            <div className="flex justify-center items-center">
              <div className="bg-white rounded-lg shadow-lg p-2 mr-4 cursor-pointer" onClick={handleGoogleSignUp}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                  alt="Google Logo"
                  className="h-8 w-8"
                />
              </div>
              <div className="bg-white rounded-lg shadow-lg p-2 cursor-pointer" onClick={handleMicrosoftSignUp}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/500px-Microsoft_logo.svg.png"
                  alt="Microsoft Logo"
                  className="h-8 w-8"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;


