import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import { Helmet } from 'react-helmet';


const PricingPage = () => {
  const pricingPlans = [
    {
      name: 'Starter',
      installationFee: '25,000',
      monthlyFee: '8,000',
      features: [
        'Real-time tracking',
        'Basic reporting',
        'Up to 100 assets',
        'Email support',
        'Mobile app access',
      ],
    },
    {
      name: 'Business',
      installationFee: '75,000',
      monthlyFee: '25,000',
      features: [
        'Advanced analytics',
        'Custom reports',
        'Up to 500 assets',
        'Priority email support',
        'API access',
        'Geofencing alerts',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      installationFee: '150,000',
      monthlyFee: '50,000',
      features: [
        'All Business features',
        'Fleet management',
        'Unlimited assets',
        '24/7 dedicated support',
        'Custom integrations',
        'On-site training',
        'SLA guarantee',
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100" itemScope itemType="https://schema.org/WebPage">
      <Helmet>
        <title>Pricing Plans | Asset Tracking Software - Installation from KES 25,000 - Locsafe</title>
        <meta
          name="description"
          content="Professional asset tracking software with one-time installation from KES 25,000 and monthly maintenance from KES 8,000. Choose from Starter, Business, or Enterprise plans. Real-time GPS tracking, AI analytics, and 24/7 support."
        />
        <meta name="keywords" content="asset tracking pricing, GPS tracking cost, fleet management pricing, supply chain software pricing, Kenya logistics software, affordable asset tracking" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://locsafe.org/pricing" />
        <meta property="og:title" content="Pricing Plans | Asset Tracking Software - Locsafe" />
        <meta property="og:description" content="Professional asset tracking with one-time installation from KES 25,000 and monthly maintenance from KES 8,000. Real-time GPS tracking and AI analytics." />
        <meta property="og:image" content="https://locsafe.org/og-image.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pricing Plans - Locsafe" />
        <meta name="twitter:description" content="Asset tracking with installation from KES 25,000 and monthly maintenance from KES 8,000." />
        
        {/* Canonical */}
        <link rel="canonical" href="https://locsafe.org/pricing" />
        
        {/* Structured Data - Product with Offers */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Locsafe Asset Tracking Platform",
            "description": "AI-powered supply chain and asset tracking platform",
            "brand": {
              "@type": "Brand",
              "name": "Locsafe"
            },
            "offers": [
              {
                "@type": "Offer",
                "name": "Starter Plan",
                "price": "25000",
                "priceCurrency": "KES",
                "priceValidUntil": "2025-12-31",
                "availability": "https://schema.org/InStock",
                "description": "One-time installation KES 25,000 + KES 8,000/month maintenance. Real-time tracking, Basic reporting, Up to 100 assets"
              },
              {
                "@type": "Offer",
                "name": "Business Plan",
                "price": "75000",
                "priceCurrency": "KES",
                "priceValidUntil": "2025-12-31",
                "availability": "https://schema.org/InStock",
                "description": "One-time installation KES 75,000 + KES 25,000/month maintenance. Advanced analytics, Custom reports, Up to 500 assets"
              },
              {
                "@type": "Offer",
                "name": "Enterprise Plan",
                "price": "150000",
                "priceCurrency": "KES",
                "priceValidUntil": "2025-12-31",
                "availability": "https://schema.org/InStock",
                "description": "One-time installation KES 150,000 + KES 50,000/month maintenance. Fleet management, Unlimited assets, 24/7 support"
              }
            ]
          })}
        </script>
      </Helmet>
      <Header/>
      <main className="flex-grow container mx-auto py-16 px-4">
        <section className="text-center mb-10 mt-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Pricing Plans</h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Choose a plan that fits your business needs. One-time installation fee plus affordable monthly maintenance. All prices in Kenyan Shillings.
          </p>
        </section>

        <section className="flex flex-wrap justify-center gap-8">
          {pricingPlans.map((plan, index) => (
            <div key={index} className="w-full md:w-1/3 px-4">
              <div className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out relative ${plan.popular ? 'border-2 border-indigo-500' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-indigo-500 text-white text-sm px-4 py-1 rounded-full">Most Popular</span>
                  </div>
                )}
                <h3 className="text-2xl text-indigo-500 font-bold mb-4">{plan.name}</h3>
                <div className="mb-6">
                  <div className="mb-3">
                    <p className="text-sm text-gray-500 uppercase tracking-wide">One-time Installation</p>
                    <p className="text-3xl font-bold text-gray-800">KES {plan.installationFee}</p>
                  </div>
                  <div className="border-t pt-3">
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Monthly Maintenance</p>
                    <p className="text-2xl font-bold text-indigo-600">KES {plan.monthlyFee}<span className="text-sm font-normal text-gray-500">/month</span></p>
                  </div>
                </div>
                <ul className="text-left mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="mb-3 flex items-center">
                      <span className="text-green-500 mr-2">✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/signup" className={`inline-block text-white px-6 py-3 rounded-md shadow transition-colors duration-200 ${plan.popular ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600'}`}>
                  Get Started
                </Link>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-16 text-center">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Need a Custom Solution?</h3>
            <p className="text-gray-600 mb-6">
              For large-scale deployments or specialized requirements, contact our sales team for a tailored quote.
            </p>
            <Link to="/contact" className="inline-block text-indigo-600 border-2 border-indigo-600 px-6 py-3 rounded-md hover:bg-indigo-600 hover:text-white transition-colors duration-200">
              Contact Sales
            </Link>
          </div>
        </section>
      </main>

      <Footer/>
      </div>
  );
};

export default PricingPage;
