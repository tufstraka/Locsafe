import { Link } from 'react-router-dom';

const Header = () => (
  <header className="py-6 bg-white shadow-lg">
    <div className="container mx-auto flex items-center justify-between px-4">
      <h1 className="text-3xl font-bold text-gray-800">Locsafe™</h1>
      <nav>
        <ul className="flex items-center space-x-8 text-gray-600 font-medium">
          <li>
            <Link to="/features" className="hover:text-gray-800">Features</Link>
          </li>
          <li>
            <Link to="/pricing" className="hover:text-gray-800">Pricing</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-800">Contact</Link>
          </li>
          {/* <li>
            <Link to="/admin/dashboard" className="hover:text-gray-800 bg-indigo-500 p-4 rounded">Login</Link>
          </li> */}
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
