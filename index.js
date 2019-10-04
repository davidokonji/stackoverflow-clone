import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import appRoutes from './server/Routes';

dotenv.config();

const app = express();
const port =  process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api',appRoutes);

app.listen(port, () => {
  return console.log(`App running on port ${process.env.APP_HOST}${port}`);
});

export default app;