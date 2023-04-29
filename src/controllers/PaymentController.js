import dotenv from 'dotenv';
import randomstring from 'randomstring';
import axios from 'axios';
import { getAccessToken } from '../helpers';

dotenv.config();
const { PAY_PACK_API_LINK } = process.env;
const PaymentController = {

  sendPayment: async (req, res) => {
    try {
    // Get access token
      const accessToken = await getAccessToken();

      const { number, amount } = req.body;
      const indepontencyKey = randomstring.generate(32);
      const response = await axios.post(
        `${PAY_PACK_API_LINK}/transactions/cashin?Idempotency-Key=${indepontencyKey}`,
        {
          amount,
          number
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          }
        }
      );

      res.status(201).send(
        response.data
      );
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: 'Unknown error occured' });
    }
  },
  verifyPayment: async (req, res) => {
    // Get access token
    try {
      const accessToken = await getAccessToken();
      const { ref } = req.query;
      const response = await axios.get(
        `${PAY_PACK_API_LINK}/events/transactions?ref=${ref}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          }
        }
      );

      res.send({ paymentStatus: response.data.transactions[0].data.status });
    } catch (e) {
      res.status(500).send({ message: 'Unknown error occured' });
    }
  }
};

export default PaymentController;
