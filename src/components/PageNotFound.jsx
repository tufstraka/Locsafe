import { Link } from 'react-router-dom';
import errorImage from '../assets/error-404.png'; 

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <img src={errorImage} alt="Error" className="w-64 mb-8" />
      <h2 className="text-4xl font-bold text-gray-800 mb-4">Oops! Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-8">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors duration-300">
        Go Back Home
      </Link>
    </div>
  );
};

export default PageNotFound;

