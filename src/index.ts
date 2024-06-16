import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv'
import routes from './routes';
import cors from 'cors';
dotenv.config()
const app: Express = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  return res.status(200).json({
    message: 'The API is running',
  });
});

const server = app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

app.use('/api/v1', routes());

export default { app, server };