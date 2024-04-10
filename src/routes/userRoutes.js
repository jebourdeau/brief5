// routes/userRoutes.js
import express from 'express'
import { getUserByIdController, createUserController } from '../controllers/userController.js'
import { userLogin } from '../controllers/userController.js'
// Route pour gérer la soumission du formulaire de connexion
const router = express.Router()

router.post('/login', userLogin)

router.get('/users/:id', getUserByIdController)
router.post('/users', createUserController)

export default router