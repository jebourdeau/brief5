// main.js
import express from 'express'
import userRoutes from './routes/userRoutes.js'
import { accesslogMiddleware } from './middlewares/accesslog.js'


const app = express();
const HOST = process.env.HOST ?? 'localhost'
const PORT = process.env.PORT || 3000

/*** Middleware ***/
app.use(express.static('public'))

// // Middleware for JSON body parsing
app.use(express.json())
// // Middleware to read FormData (accessible in `req.body`)
app.use(express.urlencoded({extended: true}))

app.use(accesslogMiddleware)
/*** Routeurs ***/

// // Routes users
app.use(userRoutes)


//Jwt
// app.post


/*** Initialisation ***/

// Serveur express.js
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`)
});