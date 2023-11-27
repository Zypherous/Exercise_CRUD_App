import React from "react"
import {Link} from 'react-router-dom'
import '../css/DisplayExercise.css';
import Axios from "axios"
function DisplayExercise(props) {
  const AddExercise = (exercise) =>{
    // console.log( exercise_name,description,bodyweight,picture )
    
    Axios.post("http://localhost:3001/exerciserouter/create-exercise", exercise, {header: {
      'Content-Type': 'application/json'}
  }
)
    .then(response =>{
      getAllExercises();
      console.log(response);

    })
    .catch(err => {console.error(err);})
  }
  const handleInput = () => {
    console.log(document.getElementById("bodyweight").checked);
    setBodyWeight(document.getElementById("bodyweight").checked); 
    
    if(!helper.checkInput("exercise_name") || !helper.checkInput("description")){
      alert("invalid input");
    }
    else{
      const newExercise = {
        exercise_name: exercise_name,
        description: description,
        bodyweight: bodyweight,
        picture: picture,   
       };
       console.log(newExercise);
      AddExercise(newExercise);
      helper.reset("exercise_name");
      helper.reset("picture");
      helper.reset("description");
      document.getElementById("bodyweight").checked =false;
    }
  }
 const bw = (props.exercise.bodyweight) ? "Bodyweight Exercise" : "Equipment Required";
 const pic = (props.exercise.picture === "") ? <img src="https://festivalofnationsstl.org/wp-content/themes/consultix/images/no-image-found-360x250.png" alt="" style={{width:"300px" ,height:"200px",overflow:"hidden",boxShadow:'0px 0px 15px -5px'}}/>:
                                               <img src={props.exercise.picture} alt="" style={{width:"300px" ,height:"200px",overflow:"hidden",boxShadow:'0px 0px 15px -5px'}}/> 
  return(
   
      <div className="container-exercise">
        <div className="img-container">
         {pic}
        </div>
        <div className="exercise-content">
        <Link to={
            {pathname: `/ExerciseDetails/${props.exercise.id}`,
            state: props.exercise.id
          }}><div className="Exercise-title"><h3>Excersice: {props.exercise.exercise_name}</h3></div></Link>
          <div className ="exercise-body"><h3>Bodyweight: {bw}</h3></div>
        </div>
      </div>
   
  )
}
export default DisplayExercise;
