import React from "react"
import {Link} from 'react-router-dom'
import '../css/DisplayExercise.css';
import Axios from "axios"
function DisplayExercise(props) {


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
          }}><div className="Exercise-title"><h3> {props.exercise.exercise_name}</h3></div></Link>
          <div className ="exercise-body"><h3>{bw}</h3></div>
        </div>
      </div>
   
  )
}
export default DisplayExercise;
