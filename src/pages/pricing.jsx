import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import { Helmet } from 'react-helmet';


const PricingPage = () => {
  const pricingPlans = [
    {
      name: 'Starter',
      price: '5,000 / month',
      features: [
        'Real-time tracking',
        'Basic reporting',
        'Up to 100 assets',
        'Email support',
      ],
    },
    {
      name: 'Business',
      price: '15,000 / month',
      features: [
        'Advanced analytics',
        'Custom reports',
        'Up to 500 assets',
        'Priority email support',
      ],
    },
    {
      name: 'Enterprise',
      price: '30,000 / month',
      features: [
        'All Business features',
        'Fleet management',
        'Unlimited assets',
        '24/7 support',
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100" itemScope itemType="https://schema.org/WebPage">
      <Helmet>
        <title>Pricing Plans | Asset Tracking Software from KES 5,000/month - Locsafe</title>
        <meta
          name="description"
          content="Affordable asset tracking software starting from KES 5,000/month. Choose from Starter, Business, or Enterprise plans. Real-time GPS tracking, AI analytics, and 24/7 support. Start your free trial today."
        />
        <meta name="keywords" content="asset tracking pricing, GPS tracking cost, fleet management pricing, supply chain software pricing, Kenya logistics software, affordable asset tracking" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://locsafe.org/pricing" />
        <meta property="og:title" content="Pricing Plans | Asset Tracking Software - Locsafe" />
        <meta property="og:description" content="Affordable asset tracking software starting from KES 5,000/month. Real-time GPS tracking, AI analytics, and 24/7 support." />
        <meta property="og:image" content="https://locsafe.org/og-image.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pricing Plans - Locsafe" />
        <meta name="twitter:description" content="Asset tracking software from KES 5,000/month with real-time GPS tracking and AI analytics." />
        
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
                "price": "5000",
                "priceCurrency": "KES",
                "priceValidUntil": "2025-12-31",
                "availability": "https://schema.org/InStock",
                "description": "Real-time tracking, Basic reporting, Up to 100 assets"
              },
              {
                "@type": "Offer",
                "name": "Business Plan",
                "price": "15000",
                "priceCurrency": "KES",
                "priceValidUntil": "2025-12-31",
                "availability": "https://schema.org/InStock",
                "description": "Advanced analytics, Custom reports, Up to 500 assets"
              },
              {
                "@type": "Offer",
                "name": "Enterprise Plan",
                "price": "30000",
                "priceCurrency": "KES",
                "priceValidUntil": "2025-12-31",
                "availability": "https://schema.org/InStock",
                "description": "Fleet management, Unlimited assets, 24/7 support"
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
