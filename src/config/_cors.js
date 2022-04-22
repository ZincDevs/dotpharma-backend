import 'regenerator-runtime';

const origins = ['http://localhost:7890/', 'http://localhost:8000/'];
export default {
  origin: (origin, callback) => {
    if (origins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
