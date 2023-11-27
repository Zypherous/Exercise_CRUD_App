import React, {useEffect, useState} from 'react'
import Axios from 'axios'

import {Link} from 'react-router-dom'
import "../css/ExerciseDetails.css"

const helper = require ('../helperfunctions/helperfunctions');


function ExerciseDetails(props){
const [edit,setEdit] = useState(false);
const[loaded, setLoaded] = useState(false);

const[exercise_name,setExerciseName] = useState("");
const[bodyweight,setBodyWeight] = useState(false);
const[description,setDescription] = useState("");
const[picture,setPicture] = useState("");


useEffect(  ()=>{
     async function getExercise(){
         await Axios.get(`http://localhost:3001/exerciserouter/get-exercise/${props.match.params.id}`)
        .then(response =>{
            
            setPicture(response.data.picture)
            setExerciseName(response.data.exercise_name);
            setDescription(response.data.description);
            setBodyWeight(response.data.bodyweight);
            setLoaded(true);
            // console.log(loaded)
        })
        .catch(err => {console.log(err)});}
        getExercise();
    }, [props.match.params.id])


const updateExercise = (exercise) =>{
    // console.log( exercise_name,description,bodyweight,picture )
    
    Axios.put(`http://localhost:3001/exerciserouter/update-exercise/${exercise.id}`, exercise, {header: {
      'Content-Type': 'application/json'}
  }
)
    .then(() =>{
        const resp = async () =>
        await Axios.get(`http://localhost:3001/exerciserouter/get-exercise/${props.match.params.id}`)
        .then(response =>{
            setPicture(response.data.picture)
            setExerciseName(response.data.exercise_name);
            setDescription(response.data.description);
            setBodyWeight(response.data.bodyweight);
            setLoaded(true);
            // console.log(loaded)
        })
        .catch(err => {console.log(err)})
      console.log(resp);

    })
    .catch(err => {console.error(err);})
  }

// const handleEdit= () =>{
//     document.getElementById("RememberMe").checked = !bodyweight;
//     setEdit(!edit);
// }

const handleInput = () => {    
    setBodyWeight(!document.getElementById("bodyweight").checked)
    console.log(bodyweight)
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
      updateExercise(newExercise);
      helper.reset("exercise_name");
      helper.reset("picture");
      helper.reset("description");
      setEdit(false);
    }
  }

const deleteExercise = ()=>{
    Axios.delete(`http://localhost:3001/exerciserouter/delete-exercise/${props.match.params.id}`)
    // .then(response => {
    //     if(response === true){alert("Deleted")}
    //     else{alert("Error")}
    //     this.document.location.href();
    // }) 
    .catch(err =>{console.log(err)})
}

const pic = (edit) ? <div><label>Images(Optional)</label><input type="text" id="picture"  defaultValue={picture} onChange={(event)=> {setPicture(document.getElementById("picture").value);}}/></div>: <img src={picture}  alt=""/>;
const exercisename = (edit)? <div><label>Name*</label><input type="text" id="exercise_name" defaultValue={exercise_name} onChange={(event)=> {setExerciseName(document.getElementById("exercise_name").value);}}/></div>: <h1>{exercise_name}</h1>;
const desc = (edit) ?  <div><label>Description*</label><input type="text" id="description" defaultValue={description}  onChange={(event)=> {setDescription(document.getElementById("description").value); }}/></div>: <h2>{description}</h2>;
const bw = (edit) ? 
    ((!bodyweight)?
    <div><label>Requires Equipment:</label><input type="checkbox" id="bodyweight" onClick={() =>{setBodyWeight(bodyweight => !document.getElementById("bodyweight").checked)}}defaultChecked={true}></input></div> :
    <div><label>Requires Equipment:</label><input type="checkbox" id="bodyweight" onClick={() =>{setBodyWeight(bodyweight => !document.getElementById("bodyweight").checked)}} ></input></div>
    )
     : 
    ((bodyweight)? 
        <h2>Bodyweight Exercise</h2> : <h2>Equipment Required</h2>);
const submitBtn = (!edit)? "":<div><button onClick={handleInput}>Submit Changes</button><button onClick={()=>{setEdit(!edit)}}>Cancel</button></div>
const editBtn = (edit)? "" :<div><button onClick={()=>{setEdit(!edit)}}>Edit</button><form action="http://localhost:3000/ExerciseList" onSubmit={()=>{alert('You deleted the exercise')}}><button onClick={deleteExercise}>Delete</button></form></div>;

const loading = (!loaded) ? <h1>Loading</h1>: 
<div >
<ul >
    <li>{pic}</li>
    <li>{exercisename}</li>
    <li>{desc}</li>
    <li>{bw}</li>
    {submitBtn}
</ul>

</div>;

// console.log("Loaded: ", loaded)
// console.log("Exercise: ", exercise)
return(

    <div className="WK-1">
        {loading}
        {editBtn}
    </div>
)

}

export default ExerciseDetails;