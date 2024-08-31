import { useState } from 'react'
import { HiOutlineCurrencyDollar } from 'react-icons/hi'
import getOAuthToken from '../utils/darajaAuth'
import { Base64 } from 'js-base64'
import axios from 'axios'
import { useLocation } from 'react-router-dom';


const Paywall = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const phoneNumber = searchParams.get('phoneNumber');
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState('')

  const handlePayment = () => {
    setLoading(true)

    const businessShortCode = 174379
    const passKey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'
    
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const date = String(now.getDate()).padStart(2, '0')
    const hour = String(now.getHours()).padStart(2, '0')
    const minute = String(now.getMinutes()).padStart(2, '0')
    const second = String(now.getSeconds()).padStart(2, '0')

    const timestamp = `${year}${month}${date}${hour}${minute}${second}`    
    const password = Base64.encode(`${businessShortCode}${passKey}${timestamp}`)

    console.log('Initiating STK push...')

    getOAuthToken()
      .then(token => {
        console.log('Access token:', token)
        const requestData = {
          BusinessShortCode: businessShortCode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: 'CustomerPayBillOnline',
          Amount: 4500,
          PartyA: phoneNumber,
          PartyB: businessShortCode,
          PhoneNumber: phoneNumber,
          CallBackURL: 'https://loc-safe.com/payment-callback',
          AccountReference: 'Locsafe',
          TransactionDesc: 'Basic Package',
          token: token
        }

        axios
          .post('https://zxs-klzo.onrender.com/api/stkpush', requestData)
          .then(response => {
            console.log('Payment response:', response.data)
            setLoading(false);
            setResponse(response.data.CustomerMessage);
            console.log(requestData);
          })
          .catch(error => {
            console.log('Payment error:', error)
            setLoading(false)
            console.log(requestData);
          })
      })
      .catch(error => {
        console.error('Error:', error)
        setLoading(false)
      })
  }

  return (
    <div className='bg-gray-100 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8'>
      
      <div className='max-w-md w-full space-y-8'>
        <div>
          <HiOutlineCurrencyDollar className='mx-auto h-12 w-auto text-indigo-600' />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Unlock Asset Tracking
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Get full access to our asset tracking system for just Ksh 4500 per month. <br />
            Covers up to 200 assets.
          </p>
        </div>
        
        <div className='mt-8'>
          <div className='rounded-md shadow'>
            <button
              onClick={handlePayment}
              disabled={loading}
              className={`w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Processing...' : 'Pay using M-pesa'}
            </button>
          </div>
        </div>

        <div>
        <p className='mt-2 text-center text-sm text-gray-600'>
                {response}
       </p>
        </div>
      </div>
    </div>
  )
}

export default Paywall


