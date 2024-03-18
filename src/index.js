const express = require('express');
const path = require('path');
const collection = require('./config');
// const bycrypt = require(bcrypt);

const app = express();
//convert data into json format
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// use ejs as the view engine
app.set('view engine', 'ejs');
//static file
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('login');
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

//Register User
app.post('/signup', async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password,
  };

  //check if the user already exist in the database
  const existingUser = await collection.findOne({ name: data.name });
  if (existingUser) {
    res.send('User already exists. Please choose a different username.');
  } else {
    // hash the password using bcrypt
    const salatRounds = 10; //Number of salt round for bcrypt
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    const userdata = await collection.insertMany(data);
    console.log(userdata);
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`server runnig on Port ${port}`);
});
