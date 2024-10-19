import express from 'express'
import compression from 'compression'
import morgan from 'morgan'
import cors from 'cors'
import router from './routes/index.js'
import session from 'express-session';

const app = express()
app.use(express.json({}))
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(compression())
app.use('/uploads', express.static('uploads'))

app.use(cors({
  origin: ['http://192.168.0.130:5173','http://192.168.0.25:5173', "http://192.168.0.131:5173", "http://192.168.0.131:5174","http://192.168.0.147:5173"],
  credentials: true
}))

app.use('/', router)
app.get('/app', (req, res) => res.send('<h1>Welcome to MyKozan Ecommerce<h1/>'))
export default app
        