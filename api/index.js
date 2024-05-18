import express from 'express';

const app = express();
const port = 3000;

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default app;

/*import express from 'express';
import axios from 'axios';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.post('/stkpush', async (req, res) => {
  const {
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
  } = req.body;

  try {
    const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
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
        'Authorization': 'Basic TmxJYVBzS1RiaEtIS3BDYWtvZXBIWnozYkowYzQ1V09yR29PVjg2aHRrOFdkZk85OlB1NmFQQm1oeFo2T0lSWkt4cGN3QlRhSjNpV0NUZkhvUlNCNm41aEtyenBPbWc3UDA5aUpabkNZblc1dmlDMUo=',
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default app;*/