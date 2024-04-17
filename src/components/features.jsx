import { FaCloud, FaMobileAlt, FaChartLine, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FeaturesPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="py-6 bg-white shadow-lg">
        <div className="container mx-auto flex items-center justify-between px-4">
          <h1 className="text-3xl font-bold text-gray-800">Locsafe™</h1>
          <nav>
            <ul className="flex items-center space-x-8 text-gray-600 font-medium">
              <li>
                <Link to="/" className="hover:text-gray-800">Home</Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-gray-800 text-indigo-500">Features</Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-gray-800">Pricing</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-gray-800">Contact</Link>
              </li>
              <li>
                <Link to="/admin/dashboard" className="hover:text-gray-800 bg-indigo-500 p-4 rounded">Login</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto my-16 px-4">
        <section className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Explore the range of cutting-edge features designed to simplify asset tracking and management for your business.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <FeatureCard
            icon={<FaCloud className="text-4xl text-indigo-500" />}
            title="Cloud-Based Technology"
            description="Access your asset data from anywhere, at any time, with our secure cloud-based platform."
          />
          <FeatureCard
            icon={<FaMobileAlt className="text-4xl text-indigo-500" />}
            title="Mobile Access"
            description="Stay connected with our mobile app, offering real-time updates and notifications on the go."
          />
          <FeatureCard
            icon={<FaChartLine className="text-4xl text-indigo-500" />}
            title="Advanced Analytics"
            description="Make informed decisions with our comprehensive analytics tools and customizable reports."
          />
          <FeatureCard
            icon={<FaShieldAlt className="text-4xl text-indigo-500" />}
            title="Unmatched Security"
            description="Protect your asset information with industry-leading security measures and protocols."
          />
        </section>
      </main>

      <footer className="py-6 bg-white shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
      <p className="text-gray-600 text-sm md:text-base text-center md:text-left mb-4 md:mb-0">© 2024 Locsafe. All rights reserved.</p>
          <nav>
          <ul className="flex items-center space-x-4 md:space-x-8 text-gray-600 font-medium justify-center">
              <li>
                <a href="#" className="hover:text-gray-800">Terms</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800">Privacy</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800">Support</a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
    <div className="text-center mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default FeaturesPage;
