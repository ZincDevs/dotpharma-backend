import 'regenerator-runtime';
import origins from './_allowedOrigins';

export default {
  origin: (origin, callback) => {
    if (origins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  optionsSuccessStatus: 200
};
