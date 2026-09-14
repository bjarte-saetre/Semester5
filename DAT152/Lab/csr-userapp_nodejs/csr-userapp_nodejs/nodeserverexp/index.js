
const express = require('express')
const multer = require('multer')
const path = require('path')
const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

// Multer setup for photo uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'db'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })
app.use(express.json())


// Use a Map to store users by email
const usersMap = new Map([])


// Route to create a new user with photo upload
app.post('/api/user', upload.single('photo'), (req, res) => {
  const { name, email, country } = req.body
  if (!name || !email || !country) {
    return res.status(400).json({ error: 'name, email, and country are required' })
  }

  let photoUrl = ''
  if (req.file && req.file.size > 0) {
    photoUrl = `http://localhost:3001/db/${req.file.filename}`
  }

  const newUser = { name, email, country, photoUrl }
  usersMap.set(email, newUser)
  res.status(201).json(newUser)
})


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1><div>Routes: /api/users, /api/users/:email, /api/user</div>')
})

// Get all users
app.get('/api/users', (request, response) => {
  // Return all users as a JSON object (email as key)
  const usersObj = Object.fromEntries(usersMap)
  response.json(usersObj)
})

// Get a single user by email
app.get('/api/users/:email', (req, res) => {
  const email = req.params.email
  const user = usersMap.get(email)
  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }
  res.json(user)
})

// Serve static files from db directory
app.use('/db', express.static(path.join(__dirname, 'db')))

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})