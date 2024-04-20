import { Helmet } from 'react-helmet';
import { FaCloud, FaMobileAlt, FaChartLine, FaShieldAlt } from 'react-icons/fa';
import Footer from '../components/footer';
import Header from '../components/header';

const FeaturesPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Helmet>
        <title>Powerful Features - Locsafe™</title>
        <meta
          name="description"
          content="Discover powerful features designed to simplify asset tracking and management for your business with Locsafe™."
        />
      </Helmet>
      <Header/>
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

    <Footer/>
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
