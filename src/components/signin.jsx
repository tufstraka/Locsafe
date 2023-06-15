import { useState } from "react";
import { FaUser, FaUserShield } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
} from "firebase/auth";

const SignIn = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const auth = getAuth();

  const handleSignIn = async(event) => {
    event.preventDefault();

    // handle sign-in logic here
    await setPersistence(auth, browserSessionPersistence)
      .then(async() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        await signInWithEmailAndPassword(auth, email, password)

        navigate("/driver/dashboard")

      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
  };

  const handleToggle = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-4">
        <h1 className="text-4xl font-bold">Sign In</h1>
      </div>
      <div className="flex items-center justify-center space-x-4">
        <button
          className={`${
            isAdmin ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          onClick={handleToggle}
        >
          <FaUser className="inline-block mr-2 mb-1" />
          User
        </button>
        <button
          className={`${
            isAdmin ? "bg-green-500 hover:bg-green-600" : "bg-gray-400"
          } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          onClick={handleToggle}
        >
          <FaUserShield className="inline-block mr-2 mb-1" />
          Admin
        </button>
      </div>
      <div className="mt-8">
        <form onSubmit={handleSignIn} className="flex flex-col space-y-4">
          <div>
            <label htmlFor="email" className="text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full rounded-md border border-gray-300 p-2 mt-2"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="text-xl font-bold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full rounded-md border border-gray-300 p-2 mt-2"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
