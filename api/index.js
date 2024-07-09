const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const cookieParser = require('cookie-parser');
const download = require('image-downloader');

require('dotenv').config();
// require('dotenv').config({ path: 'C:\Users\DELL\Desktop\Projects\airbnb-clone\api\.env' })
// console.log('url: ' + process.env.MONGO_URL)

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'awodufgyhoauwdgfoiyg';

const app = express();

app.use(express.json()); // json parser
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads')); // serve static files from /uploads

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/test', (req, res) => {
  res.json('test ok');
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const userDoc = await User.create({ 
        name, 
        email, 
        password: bcrypt.hashSync(password, bcryptSalt) 
      }); // new document
  
      res.json(userDoc);
    }
    catch(err) {
      res.status(422).json(err);
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });

    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign({email: userDoc.email, id: userDoc._id, name: userDoc.name}, jwtSecret, {}, (err, token) => {
          if (err) {
            throw err;
          }
          else {
            res.cookie('token', token).json(userDoc); // respond with a cookie with generated token and userDoc
          }
        });
      } else {
        res.status(422).json('pass not ok');
      }
    }
    else {
      res.status(422).json('user not found');
    }
});

app.get('/profile', async (req, res) => {
    const {token} = req.cookies; // grab cookie
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const {name, email, __id} = await User.findById(userData.id);
        res.json({name, email, __id});
      });
    } else {
      res.json(null);
    }
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true); // clear cookie on logout
});

app.post('/upload-by-link', async (req, res) => {
    const {link} = req.body;
    const newName = Date.now() + '.jpg';
    await download.image({
      url: link,
      dest: __dirname + '/uploads/' + newName
    });
    res.json(newName);
});

app.listen(4000);