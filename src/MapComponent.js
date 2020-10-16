import React,{useState,useEffect} from 'react'
import {mapApi} from './apikeys';

function MapComponent({lat,lng}) {
    const [mymap, setMymap] = useState(null);
    useEffect(()=>{
        if(window.L){
            setMymap(window.L.map('mapid'))
        }
    },[])
    useEffect(()=>{
        if(!mymap){
            return
        }
        mymap.setView([lat, lng], 13);
        window.L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data from Leaflet',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: mapApi 
        }).addTo(mymap);
        window.L.marker([lat, lng]).addTo(mymap);
    },[lat,lng,mymap])
    
    return (
        <div id="mapid" className="map">
        </div>
    )
}

export default MapComponent
