const express = require('express');
// const app = express();
// const PORT = 3001
// const pgsql = require('pg');
const {Op} = require('sequelize');
const db = require('../db');

const Exercise = require('../db').Exercise;

const exerciserouter = express.Router();
    
// createExercise: 
exerciserouter.post('/create-exercise', (req, res) => {
  console.log(req);
      db.sequelize.transaction(function(t){ 
        return Exercise.findOrCreate({
          where: {exercise_name: req.body.exercise_name,
                  description: req.body.description,
                  picture: req.body.picture,
                  bodyweight: req.body.bodyweight
          },
          transaction: t
        })
        .then(results =>{
          res.send(results);
          console.log(results);
        }).catch(err =>{
          console.log(err);
        })
      })
  })

// getSingle Exercise:

exerciserouter.get('/get-exercise/:id', (req,res)=>{
  const id  = req.params.id;
  Exercise.findByPk(id)
  .then(results=>{
    res.send(results)
  })
  .catch(err => {console.log(err)});
})

// getAllExercises: 
exerciserouter.get('/get-all-exercise', (req,res)=>{
    Exercise.findAll()
    .then(results =>{
        console.log("success");
        res.send(results);
    })
    .catch(err =>{console.log(err)})
})

// deleteExercise:5
exerciserouter.delete('/delete-exercise/:id', (req,res)=>{
    const id = req.params.id;
    console.log('Deleteing exercise: ');
    Exercise.destroy({
      where: {
        id: id
      }
    }).then(response =>{
      console.log(response)
    }).catch(err =>{
      console.log(err);
    })
})

// updateExercise: 
exerciserouter.put('/update-exercise/:id', (req,res)=>{
      const id = req.params.id;
      console.log(id);               
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
})

// findExercise:
    exerciserouter.get('/find-exercise/:query', (req,res)=>{
        const query = req.params.query;
        return Exercise.findAll({
          where: {
            'exercise_name': {[Op.iLike]: query +"%"}
          }
        }).then(response =>{
          res.send(response);
        })
  })

  
    module.exports = exerciserouter;