// routes/userRoutes.js
import express from 'express'
import { getUserByIdController, getPosts, createUserController } from '../controllers/userController.js'
import { userLogin, getCurrentUser } from '../controllers/userController.js'
import { requireAuthToken } from '../middlewares/authToken.js'





// Route pour gérer la soumission du formulaire de connexion


const router = express.Router()

router.get('/user', requireAuthToken, getCurrentUser)
router.post('/login', userLogin)
router.get('/users/:id', getUserByIdController)
router.get('/post', getPosts)

router.post('/users', createUserController)

export default router