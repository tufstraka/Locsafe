import { FiMail, FiPhone, FiUser } from "react-icons/fi";
import { useState } from "react";
import { getAuth, updateEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
//import { doc, getDoc } from "firebase/firestore";
//import db from "../utils/firebaseInit";

const UpdateProfilePage = ({ username, setUsername }) => {
  //const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const auth = getAuth();

  console.log(auth.currentUser);

  /*const userNameRef = doc(db, `users/${username}`);

    try {
        const docSnap = getDoc(userNameRef);
        //const person = docSnap
        console.log(docSnap.data());
    
    } catch (error) {
        console.error("Error adding document: ", error);
    }*/
  const handleSubmit = async (event) => {
    event.preventDefault();

    /*await updateProfile(auth.currentUser, {
      displayName: `${displayName}`,
    })
      .then(() => {
        // Profile updated!
        console.log("username updated");
      })
      .catch((error) => {
        // An error occurred
        console.log(error);
      });*/

    await updateEmail(auth.currentUser, email)
      .then(() => {
        // Email updated!
        console.log("Email updated");
      })
      .catch((error) => {
        // An error occurred
        console.log(error);
      });

    navigate("/user/dashboard");
  };

  const handleClick = async (event) => {
    event.preventDefault();
    navigate("/user/dashboard");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <form onSubmit={handleSubmit}>
        <div className="max-w-md mx-auto bg-white rounded shadow p-6">
          <h1 className="text-2xl font-bold mb-6">Update Profile</h1>
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <FiUser className="mr-2" />
              <label
                htmlFor="displayName"
                className="text-gray-700 font-medium"
              >
                Display Name
              </label>
            </div>
            <input
              id="displayName"
              type="text"
              disabled={true}
              value={username}
              className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <FiMail className="mr-2" />
              <label htmlFor="email" className="text-gray-700 font-medium">
                Email
              </label>
            </div>
            <input
              id="email"
              type="email"
              value={email}
              className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <FiPhone className="mr-2" />
              <label
                htmlFor="phoneNumber"
                className="text-gray-700 font-medium"
              >
                Phone Number
              </label>
            </div>
            <input
              id="phoneNumber"
              type="tel"
              value={phone}
              className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              placeholder="Enter your phone number"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow">
            Update Profile
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow"
            onClick={handleClick}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfilePage;
