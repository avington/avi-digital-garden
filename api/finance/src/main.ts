import 'express-async-errors';
import { errorHandlerMiddleware } from '@avi/api/utilities';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import * as path from 'path';

// route imports
import { portfolioRouter } from '@avi/api/finance';

// database connection
import { connectToDatabase } from './shared/database';

const configOptions: dotenv.DotenvConfigOptions = {
  path: path.resolve(__dirname, '../.env'),
};
dotenv.config(configOptions);

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

const dev = process.env.NX_PUBLIC_DEV;
if (dev) {
  app.use(morgan('combined'));
}

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to handle all the routes
app.use('/api/v1/portfolios', portfolioRouter);

// log all async errors
app.use(errorHandlerMiddleware);

const port = process.env.NX_PUBLIC_FINANCE_PORT;

if (!port) {
  console.error('NX_PUBLIC_FINANCE_PORT is not defined in the .env file');
  process.exit(1);
}

// connect to mongo
const db = async () => await connectToDatabase();
db();

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
