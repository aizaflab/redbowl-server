import express, { Application, Request, Response } from "express";
import cors from 'cors'
import router from "./app/routes";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app: Application = express()

// parserrs
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Replace * with allowed domain in production
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// root
app.get("/", (req: Request, res: Response) => {
    res.send("Hello Server");
});

// all router
app.use('/api', router)

// global error handel 
app.use(globalErrorHandler)

// not found page
app.use(notFound)

export default app;


