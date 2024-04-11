// controllers/userController.js
import User from '../models/User.js'
import Post from '../models/Post.js'
import { generateUserToken } from '../services/jwt.js'



export async function getUserByIdController(req, res) {
  const userId = req.params.id
  const user = await User.findById(userId).catch(error => {
    console.error(error)
    res.status(500).send('Invalid input')
  })
  if(user){
    res.json(user)
  }
}
export async function getCurrentUser(req, res) {
    res.json(req.user)
}

export async function createUserController(req, res) {
  const { username, email, password } = req.body
  const newUser = new User(username, email, password)
  const savedUser = await newUser.save().catch(error => {
    console.error(error)
    res.status(500).send('Invalid input')
  })
  if(User){
    res.status(201).json(savedUser)
  }
}

export async function userLogin(req, res) {
    const { username, password } = req.body
  
    // if (username === 'admin' && password === 'simplon2024') {
    //   res.send('Connexion réussie !')
    // } else {
    //   res.status(401).send('Échec de la connexion. Veuillez vérifier vos identifiants.')
    // }
    const user = await User.findByUsernameAndPassword(username, password)
        .catch(error => {
            console.error(error)
            res.status(401).json(error) 
      })
      if(user){
        const token = generateUserToken(user)
        res.json({ token })
      }
  }

export async function getPosts(req, res) {
  const posts = await Post.findAll().catch(error => {
    console.error(error)
    res.status(500)
  })
  if(posts){
    res.json(posts)
  }
}