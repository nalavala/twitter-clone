import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import usersRoute from './routes/users';
// intialize db connection
import "./database/db"
import auth from './routes/auth';
import { NotFoundError, ApiError, InternalServerError } from './core/ApiError'

const app = express();

app.use(bodyParser.json({ limit: '10mb' }));

//app.use("/", (req, res, next) => res.json({"afds" : "asdfa"}))
// Routes
app.use("/api/users/", usersRoute);
app.use("/api/auth/", auth);

// catch 404 
app.use((req, res, next) => next(new NotFoundError()));

// Middleware Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        ApiError.handle(err, res);
    } else {
        ApiError.handle(new InternalServerError(), res);
    }
});


export default app;