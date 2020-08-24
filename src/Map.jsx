import React,{useState,useEffect}from 'react'
import {Map as Leafletmap,TileLayer} from 'react-leaflet';
import './Map.css'
import {showDataOnMap} from './utils'
function Map({center,zoom}) {
    const [countries,setcountries]=useState([])
    useEffect(() => {
        const fetchData = async () => {
            await fetch('https://disease.sh/v3/covid-19/countries').then(data =>{return data.json()})
            .then((data) =>{
                setcountries(data)
            })
        }
       fetchData()
    },[])
    return (
        <div className="map">
            <Leafletmap center={center} zoom={zoom}>

            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
            </Leafletmap>
            
            {showDataOnMap(countries)}
        </div>
    )
}

export default Map
