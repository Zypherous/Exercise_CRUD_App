import React from 'react'
import Axios from 'axios'
import '../css/AddExercise.css'
const helper = require('../helperfunctions/helperfunctions');
function AddExercise(){

    const AddExercise =async () =>{
      const resp = await Axios.post("http://localhost:3001/exerciserouter/create-exercise",
      {
        exercise_name: document.getElementById("exercise_name").value,
        description: document.getElementById("description").value,
        bodyweight: document.getElementById("bodyweight").value,
        picture: document.getElementById("picture").value   
       })
      .catch(err => {console.error(err);})
      console.log(resp);
    }
    const handleInput = () => {
      if(!helper.checkInput("exercise_name") || !helper.checkInput("description")){
        alert("invalid input");
      }
      else{
        AddExercise();
      }
    }
    return(
        <div>
                <form className="styleForm">
            <label><h3>Name:</h3></label><input className ="text-link2"type="text" id="exercise_name"></input>
            <label><h3>Description:</h3></label><input className ="text-link2" type="text" id="description"></input>
            <label><h3>Images(Optional)</h3></label><input className ="text-link2" type="text" id="picture"></input>
            <label><h3>Requires Weights:</h3></label><input className="RQ-button"type="checkbox" id="bodyweight"></input>
          </form>
          <button className="AddExercise-button" onClick={handleInput}>Add Exercsise</button>
        </div>
    )
}
export default AddExercise;