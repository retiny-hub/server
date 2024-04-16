const express = require('express');
const mongoose = require('mongoose');
const compression = require('compression')
const helmet = require('helmet')
require('dotenv').config();
const {DOMAINS,API_URL,DB} = require('./config/config')
const cors = require('cors');
const userRoute = require('./routes');


const app = express();
app.listen(API_URL,()=>{
    console.log(`App running on port ${API_URL}.`);
})
mongoose.set('strictQuery',true);
mongoose.connect(DB);
mongoose.connection.on('connected',()=>{
        console.log('Connected to the db');
})
mongoose.connection.on('error',()=>{
    console.log('Failed to connect  to db');
})

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors({origin:DOMAINS}));
app.use(compression())
app.use(helmet())
app.use(userRoute);