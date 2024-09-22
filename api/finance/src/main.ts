/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import dotenv from 'dotenv';
import morgan from 'morgan';

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

app.get('/api/finance', (req, res) => {
  res.send({ message: 'Welcome to finance!' });
});

const port = process.env.NX_PUBLIC_FINANCE_PORT;

if (!port) {
  console.error('NX_PUBLIC_FINANCE_PORT is not defined in the .env file');
  process.exit(1);
}

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
