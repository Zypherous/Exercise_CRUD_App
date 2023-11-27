const express = require('express');
const app = express();
const PORT = 3001
const pgsql = require('pg');
const exerciseRoutes = require('./routes/exerciseroutes');
const workoutRoutes = require('./routes/workoutroutes');
const userRoutes = require('./routes/userroutes');

const db = require('./db');
 db
   .sequelize
   .sync({ force: false })
   .then(() => console.log('done'))




app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});
app.use(express.urlencoded({ extended: true }))
app.use(express.json());





app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`)
})

app.use('/exerciserouter', exerciseRoutes);
app.use('/workoutrouter/', workoutRoutes)