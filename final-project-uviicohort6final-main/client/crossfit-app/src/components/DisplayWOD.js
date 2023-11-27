import React from "react"
import '../css/DisplayWOD.css'
function DisplayWOD(props) {



  return(
    <div>
          <div className="container-wk1">

            <div className="WK">
              <h2>{props.workout.name}</h2>
              <hr/>
              <ul className="container-wk2">
                <li>A</li>
                <li>B</li>
                <li>C</li>
              </ul></div>
  
    </div>
    </div>
  )
}
export default DisplayWOD;
