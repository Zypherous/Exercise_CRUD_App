import React, {useState, useEffect} from "react"
import DisplayWOD from "./DisplayWOD"
import Axios from 'axios'
const helper = require('../helperfunctions/helperfunctions');


function WOD(props) {

const[loaded,setLoaded]=useState([false])
const[WODListing, setWODList] = useState([]);
const[workouts, setWorkOuts] = useState([]);
const[workoutArray, setWorkoutArray] = useState([]);
useEffect(() =>{
    const resp = async () => { await getAllWorkouts()
                               await getExercises()
                               await getExerciseNames()    
                              };
    resp();

    // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [setWODList])
  

const getAllWorkouts = async() =>{
  await Axios.get("http://localhost:3001/workoutrouter/get-all-workouts")
  .then(response =>{
    setWODList(response.data);
    // console.log(response.data);
    const workOutNames= response.data.map(item =>{ return item.workout_name});
    // console.log(workOutNames);
    const uniqueWorkouts = workOutNames.filter(helper.unique);
    // console.log(uniqueWorkouts);
    setWorkOuts(uniqueWorkouts);
    // getExercises();
  })
  .catch(err => {console.log(err);})
  
}

const getExercises = async() =>{
  workouts.forEach(item =>{
    let exeArr = [];
    // console.log(exeArr)
    for(var i = 0; i < WODListing.length; i++){
      if(WODListing[i].workout_name === item){
        // console.log(WODListing[i].exerciseId);
        exeArr =[...exeArr, { id:WODListing[i].exerciseId, sets: WODListing[i].numsets,reps:  WODListing[i].numreps, time: WODListing[i].time}];
      }
    }
    let fullWorkout = {
      name: item,
      exercises: exeArr
    }
    setWorkoutArray(workoutArray =>[...workoutArray, fullWorkout]);

    // console.log(workoutArray);
    console.log(fullWorkout)
  })
  // getExerciseNames();
}
const getExerciseNames = async () =>{
  // console.log(workoutArray);
  let exeNameArr = [...workoutArray];
  console.log(exeNameArr);
   await Promise.all(workoutArray.map(async (item, num) =>{
    item.exercises.forEach((exercise,index)=>{
      // console.log(exercise.id)
      Axios.get(`http://localhost:3001/exerciserouter/get-exercise/${exercise.id}`)
      .then(response=>{
        // console.log(response.data.exercise_name);
        // setWorkoutArray(workoutArray=>[{...workoutArray[num].exercises[index], name: response.data.exercise_name}]);
        // workoutArray[num].exercises[index] = {...workoutArray[num].exercises[index], name: response.data.exercise_name};
        // console.log("exercise", exercise)
        // exeNameArr = [{...workoutArray[num].exercises[index], name: response.data.exercise_name};]
        
      }).catch(err =>{console.log(err)})
      
  })
  }))
  console.log(workoutArray)
}
  const WODlist = (WODListing.length >0) ? WODListing.map((workout, key) => {return <DisplayWOD key={key} workout={workout} />}) : "Loading";
  return(
    <div>
          <h2>Workout List</h2>
            {WODlist}

      </div>
  )
}
export default WOD;
