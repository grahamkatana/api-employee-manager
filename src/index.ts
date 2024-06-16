import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv'
import { logger as expressWinston, errorLogger } from 'express-winston'
const { logger, requestLogger } = require('./utils/logger')
import routes from './routes';
import cors from 'cors';
dotenv.config()
const app: Express = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressWinston({
  winstonInstance: requestLogger,
  statusLevels: true,
  requestWhitelist: ['body'],
  responseWhitelist: ['body'],
}))


app.get('/', (req: Request, res: Response) => {
  return res.status(200).json({
    message: 'The API is running',
  });
});

const server = app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

app.use('/api/v1', routes());
app.use(errorLogger({
  winstonInstance: logger,
}));

module.exports = { app, server };