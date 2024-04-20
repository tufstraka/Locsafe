import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import { Helmet } from 'react-helmet';


const PricingPage = () => {
  const pricingPlans = [
    {
      name: 'Starter',
      price: '5,000',
      features: [
        'Real-time tracking',
        'Basic reporting',
        'Up to 10 vehicles',
        'Email support',
      ],
    },
    {
      name: 'Business',
      price: '15,000',
      features: [
        'Advanced analytics',
        'Custom reports',
        'Up to 50 vehicles',
        'Priority email support',
      ],
    },
    {
      name: 'Enterprise',
      price: '30,000',
      features: [
        'All Business features',
        'Fleet management',
        'Unlimited vehicles',
        '24/7 support',
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Helmet>
        <title>Pricing Plans - Locsafe™</title>
        <meta
          name="description"
          content="Choose a plan that fits your business needs. All plans are billed annually and in Kenyan Shillings. Locsafe™ offers Starter, Business, and Enterprise plans with various features to help you manage your assets effectively."
        />
      </Helmet>
      <Header/>
      <main className="flex-grow container mx-auto py-16 px-4">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Pricing Plans</h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Choose a plan that fits your business needs. All plans are billed annually and in Kenyan Shillings.
          </p>
        </section>

        <section className="flex flex-wrap justify-center gap-8">
          {pricingPlans.map((plan, index) => (
            <div key={index} className="w-full md:w-1/3 px-4">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                <h3 className="text-2xl text-indigo-500 font-bold mb-6">{plan.name}</h3>
                <p className="text-4xl font-bold mb-6">KES {plan.price}</p>
                <ul className="text-left mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="mb-3 flex items-center">
                      <span className="text-green-500 mr-2">✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/signup" className="text-white bg-indigo-500 px-6 py-3 rounded-md shadow hover:bg-indigo-600 transition-colors duration-200">
                  Get Started
                </Link>
              </div>
            </div>
          ))}
        </section>
      </main>

      <Footer/>
      </div>
  );
};

export default PricingPage;
