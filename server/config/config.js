import dotenv from 'dotenv';

dotenv.config();

const env =  process.env.NODE_ENV;

let keys = {};

switch (env) {
  case 'development':
    keys = {
      DB_URL: process.env.DB_URL_DEV
    }
    break
  case 'production':
      keys = {
        DB_URL: process.env.DB_URL_PROD
      }
    break
  case 'test':
    keys = {
      DB_URL: process.env.DB_URL_TEST
    }

  default:
    break;
}

export default keys;
