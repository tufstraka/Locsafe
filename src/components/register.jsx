import { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../utils/firebaseInit';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    phoneNumber: ''
  });
  const [loading, setLoading] = useState({
    register: false,
    google: false,
    microsoft: false
  });

  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Function to validate email domain
  const validateEmailDomain = (email) => {
    const invalidDomains = ["gmail.com", "outlook.com", "hotmail.com", "yahoo.com"];
    const emailDomain = email.split('@')[1];
    return !invalidDomains.includes(emailDomain); // Return true if domain is not in invalid domains
  };

  // Handle user registration
  const handleRegister = async () => {
    const { firstName, lastName, userName, email, password, phoneNumber } = formData;

    if (!validateEmailDomain(email)) {
      toast.error("Please use a work email address. Gmail, Outlook, Yahoo, and other public domains are not allowed.");
      return;
    }

    if (firstName && lastName && userName && email && password && phoneNumber) {
      setLoading((prev) => ({ ...prev, register: true }));
      try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', result.user.uid), { firstName, lastName, userName, email, phoneNumber });
        toast.success('Registered successfully!');
        navigate(`/pay?phoneNumber=${phoneNumber}`);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading((prev) => ({ ...prev, register: false }));
      }
    } else {
      toast.error('Please fill out all the fields');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      <ToastContainer />
      <Header />

      <div className="container mx-auto px-4 py-12 flex justify-center items-center">
        <form className="w-full max-w-lg bg-white dark:bg-gray-700 shadow-lg rounded-lg p-8 mt-16" onSubmit={(e) => e.preventDefault()}>
          <h2 className="text-center text-3xl font-semibold mb-8 text-gray-800 dark:text-white">Join the Waitlist</h2>
          <div className="space-y-4">
            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <FaUser className="text-gray-400 mr-3" />
              <input
                className="w-full bg-transparent focus:outline-none text-gray-700 dark:text-white"
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                aria-label="First Name"
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <FaUser className="text-gray-400 mr-3" />
              <input
                className="w-full bg-transparent focus:outline-none text-gray-700 dark:text-white"
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                aria-label="Last Name"
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <FaUser className="text-gray-400 mr-3" />
              <input
                className="w-full bg-transparent focus:outline-none text-gray-700 dark:text-white"
                type="text"
                name="userName"
                placeholder="Username"
                value={formData.userName}
                onChange={handleChange}
                aria-label="Username"
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <FaEnvelope className="text-gray-400 mr-3" />
              <input
                className="w-full bg-transparent focus:outline-none text-gray-700 dark:text-white"
                type="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                aria-label="Email"
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-md p-2 relative">
              <FaLock className="text-gray-400 mr-3" />
              <input
                className="w-full bg-transparent focus:outline-none text-gray-700 dark:text-white"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                aria-label="Password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 text-gray-500 hover:text-gray-700 dark:text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <FaPhone className="text-gray-400 mr-3" />
              <input
                className="w-full bg-transparent focus:outline-none text-gray-700 dark:text-white"
                type="text"
                name="phoneNumber"
                placeholder="Phone Number eg 254.."
                value={formData.phoneNumber}
                onChange={handleChange}
                aria-label="Phone Number"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleRegister}
              disabled={loading.register}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-md transition-all duration-300 flex justify-center items-center"
            >
              {!loading.register ? (
                'Sign Up'
              ) : (
                <div className="spinner-border animate-spin inline-block w-5 h-5 border-4 rounded-full border-white border-t-transparent"></div>
              )}
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
