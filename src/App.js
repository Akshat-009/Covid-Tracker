import React,{useState,useEffect} from 'react'
import { FormControl ,Select, MenuItem,Card,CardContent} from '@material-ui/core';
import "./App.css"
import InfoBox from "./InfoBox"
import Map from "./Map"
import Table from './Table'
import {sortdata} from "./utils" 
function App() {
  const [country,setcountry]=useState("World")
  const [countries,setCountries]=useState([])
  const [countryinfo,setcountryinfo]=useState({})
  const [tabledata,settabledata]=useState([])
  useEffect(() =>{
    const getCountryData=async()=>{
      await fetch('https://disease.sh/v3/covid-19/countries').then((data)=>{
        return data.json()
      }).then((data)=>{
        const countries=data.map((country)=>({
          name: country.country,//United States
          value: country.countryInfo.iso2, //USA
        }))
        settabledata(sortdata(data))
        setCountries(countries)
      })
    }
    getCountryData();
    fetch("https://disease.sh/v3/covid-19/all").then((response)=>{
      return response.json()

    }).then((data)=>{
      setcountryinfo(data)
    })
  },[])
  const setcountrydata =  async (e) =>{
    
    
    
    const country=e.target.value
  
    const url=country==="World"?"https://disease.sh/v3/covid-19/all":`https://disease.sh/v3/covid-19/countries/${country}`
     await fetch(url).then((response)=>{
       return response.json();
     }).then((data)=>{
       setcountry(e.target.value)
       setcountryinfo(data)
       
       
     })
  }
  console.log(countryinfo)
  
  return (
    <>
<div className="app">
  <div className="app__left">
    <div className="app__header">
     <h1>Corona virus tracker</h1>
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
        <InfoBox title="Covid-19 cases" cases={countryinfo.todayCases} total={countryinfo.cases} />
        <InfoBox title="Recovered" total={countryinfo.recovered} cases={countryinfo.todayRecovered} />
        <InfoBox title="Death" total={countryinfo.deaths} cases={countryinfo.todayDeaths} />
      </div>
      <div className="app__map">
        <Map/>
      </div>   
  </div>
  <Card className="app__right">
      <CardContent>
        <h1>Live world wide cases</h1>
        <Table countries={tabledata}/>
        <h2>Country wise case</h2>
      </CardContent>
    </Card>
    </div>
  
 

    </>
  )
}

export default App
