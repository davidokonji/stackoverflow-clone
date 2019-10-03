import mongoose from 'mongoose';
import config from './config';

const db = mongoose.connection;

mongoose.Promise = global.Promise;
mongoose.connect(config.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

export default db;
