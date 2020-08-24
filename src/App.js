import React,{useState,useEffect} from 'react'
import { FormControl ,Select, MenuItem,Card,CardContent} from '@material-ui/core';
import "./App.css"
import InfoBox from "./InfoBox"
import Map from "./Map"
function App() {
  const [country,setcountry]=useState("World")
  const [countries,setCountries]=useState([])
  useEffect(() =>{
    const getCountryData=async()=>{
      await fetch('https://disease.sh/v3/covid-19/countries').then((data)=>{
        return data.json()
      }).then((data)=>{
        const countries=data.map((country)=>({
          name: country.country,//United States
          value: country.countryInfo.iso2, //USA
        }))
        setCountries(countries)
      })
    }

    
    getCountryData();
  },[])
  const setcountrydata =(e) =>{
    
    //console.log(country)
    setcountry(e.target.value)
  }
  //console.log(countries)
  return (
    <>
    <div className="app__body">
    <div className="app__left">
     <div className="app__header">
     <h1>Covid 19 tracker</h1>
      <FormControl className="app__dropdown">
        <Select variant="outlined" value={country} onChange={setcountrydata}>
          <MenuItem value="World">Worldwide</MenuItem>
       {countries.map(country =>(
         <MenuItem key={country.value} value={country.value}>{country.name}</MenuItem>
       ))}
        </Select>
      </FormControl>
      </div>
      <div className="app__stats">
        <InfoBox title="Covid-19 cases" total="122" cases="123" />
        <InfoBox title="Recovered" total="122" cases="123" />
        <InfoBox title="Death" total="122" cases="123" />
      </div>
      <div className="app__map">
        <Map/>
      </div>
    </div>
      <Card className="app__right">
      <CardContent>
        <h1>Live world wide cases</h1>
        <h2>Country wise case</h2>
      </CardContent>
      </Card>
    </div>
    </>
  )
}

export default App
