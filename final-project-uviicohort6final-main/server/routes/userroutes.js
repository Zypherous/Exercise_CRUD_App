const express = require('express');
const app = express();
const PORT = 3001
const pgsql = require('pg');
const {Op} = require('sequelize');
const db = require('../db');

const User = require('../db').User;
const userrouter = express.Router();


// createUser:
userrouter.post('/create-user', (req, res) => {
      db.sequelize.transaction(function(t){ 
        return User.findOrCreate({
          where: {
              username: req.body.username,
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
          console.log(error);
        })
      })
  }),

// deleterUser:
userrouter.delete('/delete-user/:id', (req,res)=>{
      const id = req.params.id;
      console.log('Deleteing exercise from workout: ');
      User.destroy({
        where: {
          id: id
        }
      }).then(response =>{
        console.log(response)
      }).catch(err =>{
        console.log(err);
      })
    })
    module.exports = userrouter;