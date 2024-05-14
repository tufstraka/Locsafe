import { HiOutlineCurrencyDollar } from 'react-icons/hi';

const Paywall = () => {
  const handlePayment = () => {
    // Code to initiate STK push
    console.log('Initiating STK push...');
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <HiOutlineCurrencyDollar className="mx-auto h-12 w-auto text-indigo-600" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Unlock Asset Tracking</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Get full access to our asset tracking system for just Ksh 4000 per month. <br /> 
            Covers up to 100 assets.
          </p>
        </div>
        <div className="mt-8">
          <div className="rounded-md shadow">
            <button
              onClick={handlePayment}
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paywall;
