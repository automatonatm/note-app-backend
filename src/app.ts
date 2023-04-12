import "dotenv/config";

import routes from './routes/index'

import morgan from "morgan";

import createHttpError, {isHttpError} from "http-errors";

import express, { Request, Response, NextFunction } from "express";

import session from "express-session";

import env from './util/validateEnv'
import MongoStore from 'connect-mongo'
const app = express();



app.use(express.json())

app.use(session({
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {

    maxAge: 60 * 60 * 1000
  },
  rolling: true,
  store: MongoStore.create({
    mongoUrl: env.MONGO_CONNECTION_STRING_DEV,
    //collectionName: "sessiondb"
  })
}))

app.use(morgan("dev"))

app.use('/api', routes)


app.use((req, res, next) => {
 
  next(createHttpError(404, "End point not fount"));

})

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {


  let errorMessage = "An unknown error has occured";

  let statusCode = 500

  if (isHttpError(error)) {
     statusCode = error.status
     errorMessage = error.message
  }

  
  res.status(statusCode).json({ 
    status: false,
    error: errorMessage 
  });
});

export default app;
