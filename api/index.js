import axios from 'axios';

export default async function handler(request, response) {
  if (request.method === 'POST') {
    const { BusinessShortCode, Password, Timestamp, TransactionType, Amount, PartyA, PartyB, PhoneNumber, CallBackURL, AccountReference, TransactionDesc, token } = request.body;

    try {
      const res = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
        BusinessShortCode,
        Password,
        Timestamp,
        TransactionType,
        Amount,
        PartyA,
        PartyB,
        PhoneNumber,
        CallBackURL,
        AccountReference,
        TransactionDesc
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });

      response.status(200).json(res.data);
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  } else {
    response.status(405).json({ error: 'Method Not Allowed' });
  }
}