import { FaMapMarkerAlt, FaCalendarAlt, FaCheck, FaMobileAlt, FaBell, FaChartLine } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Image from '../assets/3d-casual-life-trail-map.png';
import Microsoft from '../assets/microsoft.svg';
// import ALX from '../assets/ALX.svg';
import AWSLogo from '../assets/awws.svg';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white font-sans">
      <Helmet>
        <title>Locsafe - Asset Tracking and Management System</title>
        <meta
          name="description"
          content="Locsafe™ is an asset tracking and management system that helps you keep track of your assets in real-time. Track your assets anywhere in the world, set up custom alerts and notifications, and enjoy an easy-to-use interface with an intuitive dashboard."
        />
      </Helmet>
      <Header />
      <main className="container mx-auto flex-1 my-16 flex flex-col md:flex-row px-4 pt-10 relative mb-20">
        <div className="md:w-1/2 z-10 flex flex-col justify-center mt-10 md:mt-0">
          <h2 className="text-4xl font-bold mb-8">Track your <span className='text-teal-400'>assets with ease</span></h2>
          <p className="text-gray-300 text-xl mb-8">
            Locsafe is an asset tracking and management system that helps you keep track of your assets in real-time.
          </p>
          <div className="flex items-center space-x-4 text-gray-300 font-medium mb-8">
            <FaMapMarkerAlt className="text-2xl text-blue-400" />
            <p>Track your assets anywhere in the world</p>
          </div>
          <div className="flex items-center space-x-4 text-gray-300 font-medium mb-8">
            <FaCalendarAlt className="text-2xl text-blue-400" />
            <p>Set up custom alerts and notifications</p>
          </div>
          <div className="flex items-center space-x-4 text-gray-300 font-medium mb-8">
            <FaCheck className="text-2xl text-blue-400" />
            <p>Easy-to-use interface and intuitive dashboard</p>
          </div>
          <div className="mt-8">
            <Link
              to="/features"
              className="inline-block px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 z-10 flex items-center justify-center mt-10 md:mt-0">
          <img className="h-full w-full object-contain rounded-lg md:max-w-md" src={Image} alt="3D casual life trail map" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br animate-pulse from-blue-800 to-purple-800 opacity-20 blur-3xl z-0" />
      </main>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-8 text-white">Our Partners</h3>
          <div className="flex flex-wrap justify-around items-center space-x-4 space-y-4 md:space-y-0 md:space-x-8">
            <img src={Microsoft} alt="Microsoft" className="h-12" />
            <img src={AWSLogo} alt="Amazon Web Services" className="h-12" />
            {/*<img src={ALX} alt="ALX" className="h-12" />*/}
          </div>
        </div>
      </section>

      <section id="features" className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Key Features</h3>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <FeatureCard
              icon={<FaMapMarkerAlt className="text-4xl text-teal-400 mb-4" />}
              title="Global Tracking"
              description="Monitor your assets from anywhere in the world with real-time updates."
            />
            <FeatureCard
              icon={<FaCalendarAlt className="text-4xl text-teal-400 mb-4" />}
              title="Custom Alerts"
              description="Set up personalized alerts and notifications for critical asset statuses."
            />
            <FeatureCard
              icon={<FaCheck className="text-4xl text-teal-400 mb-4" />}
              title="Intuitive Interface"
              description="Experience a user-friendly interface with an intuitive dashboard."
            />
            <FeatureCard
              icon={<FaMobileAlt className="text-4xl text-teal-400 mb-4" />}
              title="Mobile Access"
              description="Access and manage your assets on the go with our mobile-friendly app."
            />
            <FeatureCard
              icon={<FaBell className="text-4xl text-teal-400 mb-4" />}
              title="Real-time Notifications"
              description="Receive real-time notifications for any changes or updates to your assets."
            />
            <FeatureCard
              icon={<FaChartLine className="text-4xl text-teal-400 mb-4" />}
              title="Detailed Analytics"
              description="Get comprehensive analytics and reports to make informed decisions."
            />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-8">Why Choose Locsafe</h3>
          <p className="text-gray-300 text-xl mb-8">Locsafe offers unmatched reliability and ease of use for managing your valuable assets. Here’s why our customers love us:</p>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-4">Security</h4>
              <p className="text-gray-300">We prioritize the security of your data with industry-leading encryption and safety protocols.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-4">Support</h4>
              <p className="text-gray-300">Our dedicated support team is available 24/7 to assist you with any queries or issues.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-4">Customization</h4>
              <p className="text-gray-300">Tailor the system to your specific needs with our flexible customization options.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-4">Integration</h4>
              <p className="text-gray-300">Seamlessly integrate Locsafe with your existing tools and systems for a smooth workflow.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-8">Get Started with Locsafe</h3>
          <p className="text-gray-300 text-xl mb-8">Join thousands of satisfied users who trust Locsafe™ for their asset management needs.</p>
          <Link
            to="/register"
            className="inline-block px-8 py-4 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="feature bg-gray-700 p-6 rounded-lg shadow-md flex flex-col justify-center items-center">
      {icon}
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

export default LandingPage;