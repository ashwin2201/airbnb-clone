const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const bcryptSalt = bcrypt.genSalt(10);

const app = express();

app.use(express.json()); // json parser

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/test', (req, res) => {
  res.json('test ok');
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    User.create({ 
      name, 
      email, 
      password: bcrypt.hashSync(password, bcryptSalt) 
    }); // new document
});

app.listen(4000);