import React, { Component } from 'react';
import Gallery from './components/gallery'
import Board from './components/board'
import Profile from './components/profile'

import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';

import './App.css'

class App extends Component {

  // componentDidMount() {
  //   const today = new Date();

  //   const year = today.getFullYear()
  //   const month = today.getMonth() + 1
  //   const day = today.getDate()
  //   const hour = today.getHours()
  //   const min = today.getMinutes()
  //   const sec = today.getSeconds()

  //   const firstDoc = year + "-" + month + "-" + day
  //   const secDoc = hour + ":" + min + ":" + sec

  //   firebase.firestore.collection('visitor').doc(firstDoc).collection(secDoc).add({ visitCount : 1}).then(res => {

  //   }).catch(err => console.log(err))
  // }


  render() {
    return (
      <Router>
        <div className="App">
        <span className="line"></span>
          <div className="router-container">
          <NavLink to="/" style={{marginLeft:"30px", fontSize: "50px"}}>Teeu</NavLink>
          <div className="nav-bar">
            <ul style={{display:"flex", justifyContent:"center", alignItems:"center" ,fontSize:"20px"}}>
              <li style={{ display: "inline-block", marginLeft: "30px" }}><NavLink to="/">Profile</NavLink></li>
              <li style={{ display: "inline-block", marginLeft: "30px" }}><NavLink to="/board">Board</NavLink></li>
              <li style={{ display: "inline-block", marginLeft: "30px" }}><NavLink to="/gallery">Gallery</NavLink></li>
            </ul>
          </div>

          <Switch>
            <Route exact path="/" component={Profile}></Route>
            <Route exact path="/board" component={Board}></Route>
            <Route exact path="/gallery" component={Gallery}></Route>
          </Switch>
          </div>
        </div>
      </Router>

    )
  }
}

export default App;
