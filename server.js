const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex')
const cors = require('cors');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : 'postgres://smartbraindb_7crl_user:PSo2nXcFttYGJxrtonGpDMvHovDdIds4@dpg-cg483spmbg5d8843til0-a.oregon-postgres.render.com/smartbraindb_7crl',
    port : 5432,
    user : 'smartbraindb_7crl_user',
    password : 'PSo2nXcFttYGJxrtonGpDMvHovDdIds4',
    database : 'smartbraindb_7crl'
  }
});

const app = express();

app.use(bodyParser.json())
app.use(cors())
app.options('*', cors())

app.get('/', (req, res) => {
  res.send('Success');
})
app.post('/signin', (req, res) => {signin.handleSignIn(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})


app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running on port ${process.env.PORT}`)
})