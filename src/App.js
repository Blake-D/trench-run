import React, { useEffect, useState, } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import './App.css'
import Title from './components/Title'
import Assemble from './components/Assemble'
import Battle from './components/Battle'
const axios = require('axios')

function App() {

  const [ships, setShips] = useState([])
  const [myShips, setMyShips] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/')
      .then(shipData => {
        setShips(shipData.data)
      })
  }, [])

  console.log(ships)

  function addShip(e) {
    if (myShips.length < 5) {
      if(myShips.includes(e.target.id)){
        alert('Ship already in fleet')
      } else{
        let tempMyShips = myShips
        tempMyShips.push(e.target.id)
        setMyShips(tempMyShips)
        let tempShips = []
        for(let i = 0; i < ships.length; i++){
          if(!myShips.includes(ships[i])){
            tempShips.push(ships[i])
          }
        }
        setShips(tempShips)
      }
    } else {
      alert("Roster Full")
    }
  }

  return (
    <div>
      <Router>
        <Route exact path='/' render={Title} />
        <Route path='/assemble' render={() => <Assemble addShip={addShip} ships={ships} myShips={myShips} />} />
        <Route path='/battle' render={() => <Battle myShips={myShips} /> } />
      </Router>
    </div>
  )
}

export default App