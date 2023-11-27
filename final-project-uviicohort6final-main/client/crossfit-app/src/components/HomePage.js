import React, { useState, useEffect } from "react"
import {Link} from "react-router-dom"
import "../css/HomePage.css"
import weightlifting from "../Photos/weightlifting.png"
import runningMan from "../Photos/runningMan.png"
import clipboard from "../Photos/clipboard.png"
import Axios from 'axios'
function HomePage(props) {

  const[quote, setQuote] = useState("")
  useEffect(() =>{ if(quote === ""){getQuote()}});
  const getQuote = async() =>{
    const resp = await Axios.get("https://type.fit/api/quotes")
  .then(function(response) {
    return response;
  })
  .then(function(data) {
    const quote = Math.floor(Math.random() * data.data.length);
    console.log(data.data[quote]);
   setQuote(data.data[quote].text + "\n-" + data.data[quote].author);
  });
  console.log(resp);
}

  return(
    <div>
          <div className ="quote-1">
            <h1>{quote}</h1>
          </div>

      <div className="quote-2"><h2>The Tools for your crossfit journey</h2></div>
      <div className="container" >
        <div>
          <img className="homepage-img" src={runningMan} alt="Excercise" />
          <h3>Track your weight</h3>
          <p>Learning and tracking your weight, will allow you to better understand the workouts needed to maintain your <span>IDEAL BODY</span> </p>
        </div>
        <div>
          <Link className="text-link" to={
            {
              pathname: "/ExerciseList",
              state: { from: "root" }
            }
          }><img className="homepage-img" src={weightlifting} alt="Track of weight " /></Link>
          <h3>Excercises</h3>
          <p>Knowing the right Excercises and knowing how to use them can be the dedicing factor to your <span>IDEAL BODY</span> </p>
        </div>
        <div>
          <Link className="text-link" to={
            {
              pathname: "/WOD",
              state: { from: "root" }
            }
          }><img className="homepage-img" src={clipboard} alt="WOD " /></Link>
          <h3>Workout Of the Day</h3>
          <p> Remember, Having a fun and enjoyable workout that is suited for you will allow you access to your desired  <span>IDEAL BODY</span></p>
        </div>
      </div>
    </div>
  )
}
export default HomePage;
