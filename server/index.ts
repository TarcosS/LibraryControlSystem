// Modules 
import express from 'express';
import jwt from 'jsonwebtoken';
import morgan from 'morgan';
import cors from 'cors';
import 'console-info';
import 'console-warn';
import 'console-error';
// Constants
import { PORT } from './constants';
import rateLimit from 'express-rate-limit';
import { sequelize } from './configs/db';
import authRouter from './routes/authenticationRouter';
import initAssociations from './models'
import reservationRouter from './routes/reservationRouter';
import tableRouter from './routes/tableRouter';
const app = express();

// Middlewares 
app.use(morgan('common'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
  })
);

/** Apply the rate limiting middleware to all requests */
app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minutes
      max: 50, // Limit each IP to 100 requests per `window` (here, per 10 minutes)
      handler: function (req, res, next) {
        return res.json({ error: { message: 'Too many requests, please try again later.' } });
      },
    })
);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/reservation', reservationRouter);
app.use('/api/v1/table', tableRouter);

/** Database connection */
initAssociations();
sequelize
  .sync({ force: true })
  .then(() => {
      console.info('Database connected!');
      /** Server */
      app.listen(PORT, () => {
        console.info('Server listening on port: ' + PORT);
      });
  })
  .catch((error) => {
    console.error('DB Error: ' + JSON.stringify(error));
  });