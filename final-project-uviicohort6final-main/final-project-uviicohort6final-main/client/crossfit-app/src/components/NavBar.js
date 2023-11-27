import React from "react"
import {Link,Route,Switch,BrowserRouter as Router} from "react-router-dom"
import "../css/NavBar.css"
import "../css/normalize.css"
import HomePage from "./HomePage"
import ExerciseList from "./ExerciseList"
import WOD from './WOD'
import logo from '../Photos/logo.png'
import ExerciseDetails from './ExerciseDetails'
import AddExercise from "./AddExercise"
function NavBar() {
  return (
    
          <Router>
                <div >
                    <div className="navBar-container">
                            <nav className="navBar" >
                        <ul >
                            <li className="logo"><Link className="text-link"to ={
                                {
                                    pathname: "/",
                                    state:{ from:"root"}
                                }
                            }><img className="logo-image" src={logo} alt=""/></Link></li>

                             <li><Link className="text-link" to ={
                                {
                                    pathname: "/ExerciseList",
                                    state:{ from:"root"}
                                }
                            }>EXERCISE LIST</Link></li>

                            <li><Link className="text-link" to ={
                                {
                                    pathname: "/WOD",
                                    state:{ from:"root"}
                                }
                            }>WORKOUTS</Link></li>


            </ul>
            </nav>
                    </div>
                    
            <Switch>
                        <Route exact path ="/" component={HomePage} />
                        <Route exact path ="/ExerciseList" component={ExerciseList} />
                        <Route exact path ="/WOD" component={WOD} />
                        <Route exact path ="/ExerciseDetails/:id" component={ExerciseDetails} />
                        <Route exact path ="/AddExercise" component={AddExercise} />            </Switch>
            </div>
            </Router>
 
  )
}

export default NavBar;
