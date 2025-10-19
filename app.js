require('dotenv').config({path: `${process.cwd()}/.env`});
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const profileRoute = require('./router/getRouter');
const AppError = require('./utils/AppError');
const notFoundError = require('./utils/not-found');
const cors = require('cors');
const corsOptions = {
    origin: '*',
    methods: ['GET'],
    allowedHeaders: ['Content-Type'],
    maxAge: 3600
};
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});

app.use(cors(corsOptions));
app.use(limiter);
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/me', profileRoute);



app.use((error, req, res, next) =>{
    if(error instanceof AppError){ 
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message
        })}
    else {      
       res.status(500).json({
           status: 'error',
           message: 'Internal Server Error'
       })
   }
});

app.use(notFoundError);


app.listen(PORT, () => {
    console.log(`Server listening; Port: ${PORT}`)
});