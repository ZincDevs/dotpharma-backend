import 'regenerator-runtime';
import connection from './index';

const con = connection();
const execute = {
  query: async (text, params) => {
    const client = await con.connect();
    const result = await client.query(text, params);
    client.release();
    return result;
  },
};

export default execute;
