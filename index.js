import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url';
import morgan from 'morgan'
import bodyParser from 'body-parser'
import hbs from 'hbs'

import connectDB from './server/database/connection.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import adminRoute from './server/routes/admin.js'

const app = express()
dotenv.config()

app.use(morgan('tiny'));

connectDB()

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

hbs.cachePartials = true;

//middlewares
app.use("/", adminRoute)

app.use("*",(req,res,next)=>{
    res.status(404).send('Sorry, the page you requested was not found');
})

app.listen(process.env.PORTS || 3000, () => {
    console.log('Server is Running');
})