import express from 'express';
import axios from 'axios';

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
      PartyA: 254721823822,
      PartyB: 174379,
      PhoneNumber: 254721823822,
      CallBackURL: "https://mydomain.com/path",
      AccountReference: "LocsafeLTD",
      TransactionDesc: "Payment of X"
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 05Lt1mjozRx2G26z159MRTlo98u5'
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default app;