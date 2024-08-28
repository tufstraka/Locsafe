import { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { RiGoogleFill, RiMicrosoftFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../utils/firebaseInit';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState({
    register: false,
    google: false,
    microsoft: false
  });

  const navigate = useNavigate();
  const auth = getAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
    const { firstName, lastName, userName, email, password } = formData;
    if (firstName && lastName && userName && email && password) {
      setError('');
      setLoading((prev) => ({ ...prev, register: true }));
      try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', result.user.uid), { firstName, lastName, userName, email });
        navigate('/pay');
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading((prev) => ({ ...prev, register: false }));
      }
    } else {
      setError('Please fill out all the fields');
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading((prev) => ({ ...prev, google: true }));
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await setDoc(doc(db, 'users', user.uid), {
        firstName: user.displayName.split(' ')[0],
        lastName: user.displayName.split(' ')[1],
        userName: user.displayName,
        email: user.email
      });
      navigate('/pay');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, google: false }));
    }
  };

  const handleMicrosoftSignIn = async () => {
    setLoading((prev) => ({ ...prev, microsoft: true }));
    setError('');
    try {
      const provider = new OAuthProvider('microsoft.com');
      await signInWithPopup(auth, provider);
      navigate('/pay');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, microsoft: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-12 flex justify-center items-center">
        <form className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 mt-16 " onSubmit={(e) => e.preventDefault()}>
          <h2 className="text-center text-3xl font-semibold mb-8 text-gray-800 ">Join the Waitlist</h2>
          <div className="space-y-4">
            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <FaUser className="text-gray-400 mr-3" />
              <input
                className="w-full bg-transparent focus:outline-none text-gray-700"
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
                className="w-full bg-transparent focus:outline-none text-gray-700"
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
                className="w-full bg-transparent focus:outline-none text-gray-700"
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
                className="w-full bg-transparent focus:outline-none text-gray-700"
                type="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                aria-label="Email"
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <FaLock className="text-gray-400 mr-3" />
              <input
                className="w-full bg-transparent focus:outline-none text-gray-700"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                aria-label="Password"
              />
            </div>
          </div>
          {error && <div className="text-red-500 text-sm mt-4">{error}</div>}
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleRegister}
              disabled={loading.register}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-md transition-all duration-300 flex justify-center items-center"
            >
              {!loading.register ? 'Sign Up' : <span className="spinner"></span>}
            </button>
          </div>
          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading.google}
              className="w-1/2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 border border-gray-300 rounded-md transition-all duration-300 flex justify-center items-center"
            >
              {!loading.google ? <RiGoogleFill className="text-xl" /> : <span className="spinner"></span>}
            </button>
            <button
              onClick={handleMicrosoftSignIn}
              disabled={loading.microsoft}
              className="w-1/2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 border border-gray-300 rounded-md transition-all duration-300 flex justify-center items-center"
            >
              {!loading.microsoft ? <RiMicrosoftFill className="text-xl" /> : <span className="spinner"></span>}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;

