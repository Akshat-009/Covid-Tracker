import React,{useState} from 'react'
import { FormControl ,Select, MenuItem} from '@material-ui/core';
import "./App.css"
function App() {
  const [country,setcountry]=useState("world")
  return (
    <>
    <div className="app__body">
    <h1>Covid 19 tracker</h1>
      <FormControl variant="outlined">
        <Select value={country}>
          <MenuItem value="world">World</MenuItem>
        </Select>
      </FormControl>
      
      
    </div>
    </>
  )
}

export default App
