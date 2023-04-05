import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url';
import morgan from 'morgan'
import bodyParser from 'body-parser'

import connectDB from './server/database/connection.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import userRoute from './server/routes/user.js'

const app = express()
dotenv.config()

app.use(morgan('tiny'));

connectDB()

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// app.engine('hbs', hbs.engine({
//     extname: 'hbs',
//     defaultLayout: 'layout',
//     layoutsDir: __dirname + '/views/layout/'
// }))
app.use("/js",express.static(path.join(__dirname, 'assets/js')));
app.use(express.static(path.join(__dirname, 'public')));

//middlewares
app.use("/", userRoute)

app.listen(process.env.PORTS || 3000, () => {
    console.log('Server is Running');
})