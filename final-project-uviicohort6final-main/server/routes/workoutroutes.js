const express = require('express');
const PORT = 3001
const pgsql = require('pg');
const {Op} = require('sequelize');
const db = require('../db');
const Workout = require('../db').Workout;
const Exercise = require('../db').Exercise;

const workoutrouter = express.Router();

  // createWorkout:
  workoutrouter.post('/create-workout', (req, res) => {
      db.sequelize.transaction(function(t){ 
        return Workout.findOrCreate({
          where: {workout_name: req.body.workout_name,
                  numsets: req.body.numsets,
                  numreps: req.body.numreps,
                  time: req.body.time,
                  bodyweight: req.body.bodyweight,
                  userid: 1,
                  exerciseid: req.body.exerciseid
          },
          transaction: t
        })
        .then(results =>{
          const created = results[1];
          const userResult = results[0];
          console.log(results);
          if(created){
            res.send(true);
          }else{
            res.send(false)
          }
        }).catch(err =>{
          console.log(err);
        })
      })
  }),



  // getAllWorkouts:
  workoutrouter.get('/get-all-workouts', (req,res)=>{
      Workout.findAll({})
      .then(results =>{
          console.log("success");
          // console.log(results);
          res.send(results);
      })
      .catch(err =>{console.log(err)})
  }),


  // deleteWorkout:
  workoutrouter.delete('/delete-all-workouts', (req,res)=>{
      
      console.log('Deleteing entire workout: ');
      Exercise.destroy({
        where: {
          name: req.body.name
        }
      }).then(response =>{
        console.log(response)
      }).catch(err =>{
        console.log(err);
      })
    }),

  // deleteExerciseFromWorkout:
  workoutrouter.delete('/delete-workout/:id', (req,res)=>{
        const id = req.params.id;
        console.log('Deleteing exercise from workout: ');
        Exercise.destroy({
          where: {
            id: id
          }
        }).then(response =>{
          console.log(response)
        }).catch(err =>{
          console.log(err);
        })
    }),

  // updateWorkout:
  workoutrouter.put('/update-workout/:id', (req,res)=>{
        const id = req.params.id;               
        Exercise.update({
            exercisename: req.body.exercisename,
            description: req.body.description,
            picture: req.body.picture,
            bodyweight: req.body.bodyweight},
            {
                where: {id:id}
              }).then(response =>{
                  res.send(response);
              }).catch(err =>{
                  console.log(err)
          })
      }),

  // searchWorkout:
  workoutrouter.get('/find-workout/:query', (req,res)=>{
          const query = req.params.query;
          return Workout.findAll({
            where: {
              'workout_name': {[Op.iLike]: query +"%"}
            }
          }).then(response =>{
            res.send(response);
            console.log(response);
          })
      })
      module.exports = workoutrouter;