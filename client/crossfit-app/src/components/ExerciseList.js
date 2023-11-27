import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import Axios from 'axios'
import DisplayExercise from './DisplayExercise'

function ExerciseList(props) {

  const [exerciseList,setExerciseList] = useState([]);
  useEffect(() =>{
      getAllExercises();
      // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [setExerciseList])

  const getAllExercises = async() =>{
    await Axios.get("http://localhost:3001/exerciserouter/get-all-exercise")
    .then(response =>{
      setExerciseList(response.data);
      console.log(response.data);

    })
    .catch(err => {console.log(err);})
    
  }
  const searchExerciseListing = async () =>{
    const query = document.getElementById("exeSearch").value;
    console.log(query);
    if(query===""){
      getAllExercises();
    }else{
    const resp = await Axios.get(`http://localhost:3001/exerciserouter/find-exercise/${query}`)
    .then(response => {
        console.log(response.data);
        if(response.data.length=== 0){
            alert("Not Found");
        }else{
          setExerciseList(exerciseList =>response.data);
        }
    }).catch(err =>{
        console.log(err);
    })
    console.log(resp);
  }
}

  const exerciseListing = (exerciseList !== null) ? exerciseList.map((exercise, key) => {return <DisplayExercise key={key} exercise={exercise} />}) : "Loading";
  return(
    <div >

        <h2>Excersice List</h2>
   
          <input id="exeSearch" type="text" placeholder="Search..." /><button  className="exeButton" onClick={searchExerciseListing}>Search</button>
          <div className="exercise-body">
        {exerciseListing}
        </div>

         <br></br>
            <Link className="text-link" to ={
                                  {
                                      pathname: "/AddExercise",
                                      state:{ from:"root"}
                                  }
                              }><button className="add-exercise">Add Exercise</button></Link>
            
              </div>
  )
}
export default ExerciseList;
