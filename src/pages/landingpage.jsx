import { FaMapMarkerAlt, FaCalendarAlt, FaLock, FaNetworkWired, FaBell, FaChartLine } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import BackgroundImage from '../assets/background.svg'; 
import Image from '../assets/3d-casual-life-trail-map.png';
import Microsoft from '../assets/microsoft.svg';
import AWSLogo from '../assets/awws.svg';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
//import socialproof from '../assets/socialproof.svg'
import avatar from '../assets/avgroup.svg'
import reviews from '../assets/reviews.svg'
import bot from '../assets/bot.svg'

const LandingPage = () => {
  return (
    <div className="relative flex flex-col min-h-screen bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText font-sans">
      <Helmet>
        <title>Locsafe - Supply Chain Transparency</title>
        <meta
          name="description"
          content="Locsafe™ is a blockchain-based supply chain tracking system that ensures transparency, traceability, and security for your assets in real-time. Monitor your supply chain from production to delivery with ease."
        />
      </Helmet>

      <img
        className="absolute inset-0 bg-center dark:opacity-5 z-0"
        src={BackgroundImage}
      />

      {/* Main content */}
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto flex-1 my-16 flex flex-col md:flex-row px-4 pt-10 relative mb-20">
          <div className="md:w-1/2 z-10 flex flex-col justify-center mt-10 md:mt-0 m-2">
            <h2 className="text-4xl font-bold mb-4 lg:mt-10 ">
              Bring <span className="text-accent">transparency</span> to your supply chain
            </h2>
            <p className="text-xl mb-4">
              Locsafe leverages blockchain technology to ensure you can trace your products and assets in real-time, from the origin to the final destination, reducing fraud and increasing accountability.
            </p>
            <div className="flex items-center space-x-4 font-medium mb-4">
              <FaNetworkWired className="text-2xl text-accent" />
              <p>Blockchain-powered tracking for end-to-end transparency</p>
            </div>
            <div className="flex items-center space-x-4 font-medium mb-4">
              <FaLock className="text-2xl text-accent" />
              <p>Enhanced security and data immutability</p>
            </div>
            <div className="flex items-center space-x-4 font-medium mb-4">
              <FaBell className="text-2xl text-accent" />
              <p>Real-time alerts for any discrepancies or updates</p>
            </div>
            <div className="flex items-center space-x-4 font-medium mt-4">
              <Link
                to="/features"
                className="inline-block px-6 py-3 bg-accent text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
              >
                Learn More
              </Link>
              <div className='m-1'>
              <img src={bot} alt='Discover AI integration' />
            </div>
            </div>
            <div className='flex mt-6 justify-between w-[320px]  m-1'>
              <img src={avatar} alt='user reviews' />
              <img src={reviews} alt="ratings" />
            </div>
          </div>
          <div className="md:w-1/2 z-10 flex items-center justify-center mt-10 md:mt-0">
            <img className="h-full w-full object-contain rounded-lg md:max-w-md" src={Image} alt="Blockchain supply chain tracking" />
          </div>
        </main>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-8">Our Partners</h3>
            <div className="flex flex-wrap justify-around items-center space-x-4 space-y-4 md:space-y-0 md:space-x-8">
              <img src={Microsoft} alt="Microsoft" className="h-12" />
              <img src={AWSLogo} alt="Amazon Web Services" className="h-12" />
            </div>
          </div>
        </section>

        <section id="features" className="py-16">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">Key Features</h3>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <FeatureCard
                icon={<FaMapMarkerAlt className="text-4xl text-accent mb-4" />}
                title="Global Traceability"
                description="Track your products and assets at every stage, from production to delivery."
              />
              <FeatureCard
                icon={<FaLock className="text-4xl text-accent mb-4" />}
                title="Data Security"
                description="Immutable records that enhance security and reduce risks of fraud."
              />
              <FeatureCard
                icon={<FaBell className="text-4xl text-accent mb-4" />}
                title="Real-time Alerts"
                description="Receive instant alerts for any discrepancies or status updates in your supply chain."
              />
              <FeatureCard
                icon={<FaNetworkWired className="text-4xl text-accent mb-4" />}
                title="Decentralized Transparency"
                description="Maintain transparency across global supply chains without the need for a central authority."
              />
              <FeatureCard
                icon={<FaChartLine className="text-4xl text-accent mb-4" />}
                title="Comprehensive Analytics"
                description="Gain insights into your supply chain operations with detailed analytics."
              />
              <FeatureCard
                icon={<FaCalendarAlt className="text-4xl text-accent mb-4" />}
                title="Customized Notifications"
                description="Set up personalized notifications based on your specific supply chain needs."
              />
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold mb-8">Why Choose Locsafe</h3>
            <p className="text-xl mb-8">Locsafe offers unparalleled transparency and security in managing supply chains. Here's why businesses trust us:</p>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="bg-gray-300 dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold mb-4">Security</h4>
                <p>Our blockchain-based platform ensures that data remains secure and tamper-proof.</p>
              </div>
              <div className="bg-gray-300 dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold mb-4">Efficiency</h4>
                <p>Streamline your supply chain operations with real-time tracking and automation.</p>
              </div>
              <div className="bg-gray-300 dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold mb-4">Transparency</h4>
                <p>Increase accountability and trust by making the supply chain fully transparent.</p>
              </div>
              <div className="bg-gray-300 dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold mb-4">Flexibility</h4>
                <p>Customize our platform to suit the unique requirements of your supply chain.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold mb-8">Get Started with Locsafe</h3>
            <p className="text-xl mb-8">Experience the future of supply chain management with blockchain-powered solutions. Join today!</p>
            <Link
              to="/register"
              className="inline-block px-8 py-4 bg-accent text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
            >
              Sign Up Now
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="feature bg-gray-300 dark:bg-gray-700 p-6 rounded-lg shadow-md flex flex-col justify-center items-center">
      {icon}
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-lightText dark:text-darkText">{description}</p>
    </div>
  );
};

export default LandingPage;
