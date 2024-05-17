const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

app.post('/stkpush', async (req, res) => {
  try {
    const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
      BusinessShortCode: 174379,
      Password: "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjQwNTE3MjAwMjU5",
      Timestamp: "20240517200259",
      TransactionType: "CustomerPayBillOnline",
      Amount: 1,
      PartyA: 254701746774,
      PartyB: 174379,
      PhoneNumber: 254701746774,
      CallBackURL: "https://loc-safe.com/api/pay-callback",
      AccountReference: "LocsafeLTD",
      TransactionDesc: "Payment of X"
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic TmxJYVBzS1RiaEtIS3BDYWtvZXBIWnozYkowYzQ1V09yR29PVjg2aHRrOFdkZk85OlB1NmFQQm1oeFo2T0lSWkt4cGN3QlRhSjNpV0NUZkhvUlNCNm41aEtyenBPbWc3UDA5aUpabkNZblc1dmlDMUo=',
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
