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
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8 flex justify-center items-center">
        <form className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-16" onSubmit={(e) => e.preventDefault()}>
          <h2 className="text-center text-2xl font-semibold mb-8">Join the waitlist</h2>
          <div className="mb-4 flex items-center">
            <FaUser className="icon mr-2" />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 flex items-center">
            <FaUser className="icon mr-2" />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 flex items-center">
            <FaUser className="icon mr-2" />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="userName"
              placeholder="Username"
              value={formData.userName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 flex items-center">
            <FaEnvelope className="icon mr-2" />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 flex items-center">
            <FaLock className="icon mr-2" />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="flex justify-center">
            <button
              onClick={handleRegister}
              disabled={loading.register}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {!loading.register ? 'Sign Up' : <span className="spinner"></span>}
            </button>
          </div>
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading.google}
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-4"
            >
              {!loading.google ? <RiGoogleFill className="logo" /> : <span className="spinner"></span>}
            </button>
            <button
              onClick={handleMicrosoftSignIn}
              disabled={loading.microsoft}
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
              {!loading.microsoft ? <RiMicrosoftFill className="logomi" /> : <span className="spinner"></span>}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
