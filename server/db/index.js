'use strict';

const Sequelize = require('sequelize');
const WorkoutModel = require('./models/workout.js');
const ExerciseModel = require('./models/exercise.js');
const UserModel = require('./models/user.js');

const sequelize = new Sequelize('postgres://postgres:password@localhost/postgres');


const Workout = WorkoutModel(sequelize, Sequelize);
const Exercise = ExerciseModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);


User.hasMany(Workout);
Exercise.hasMany(Workout);

module.exports = {
  sequelize,
  Sequelize,
  Workout,
  Exercise,
  User
}