import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

export const sortdata=(data)=>{
    const sorteddata=data;
    sorteddata.sort((a,b)=>{
        if (a.cases>b.cases)
        {return -1}
        else
        {return 1}
        
    })
    return sorteddata;
}
const casesTypeColors={
    cases:
    {
        hex:'#c0392b',
        multiplier:1200
    },
    recovered:
    {
        hex:'#27ae60',
        multiplier:500,
    },
    deaths:
    {
        hex:'#d35400',
        multiplier:2000
    }

}

export const showDataOnMap = (data, casesType = "cases") =>
{
  data.map((country) => (
    <Circle
    center={[country.countryInfo.lat, country.countryInfo.long]}
    color={casesTypeColors[casesType].hex}
    fillColor={casesTypeColors[casesType].hex}
    fillOpacity={0.4}
    radius={
      Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
    }
    
    >
        <Popup>
            <h1>I am a country</h1>
        </Popup>
    </Circle>
  ));

    }