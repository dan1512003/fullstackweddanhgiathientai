import React, { useEffect, useRef, useState }  from 'react'
import { MapContainer, TileLayer, Marker,Popup} from 'react-leaflet';
import style from './googleearthengineanalysis.module.css'
import "./googleearthengineanalysis.module.css"
import 'leaflet/dist/leaflet.css';
import '../../index.css';
import axios from 'axios';
import { LngLat, Map } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css'
import maplibregl from 'maplibre-gl';
import { bbox } from '@turf/turf';

const GoogleEarthEngineAnalysis = (props) => {

  const mapRef =useRef(null)
    const mapIdDiv = "map";
  
    const eeLayerId = "ee-layer";
  
    const mapStyle = {
      height: "100%",
      width: "100%",
    };
  

    useEffect(() => {
  
    mapRef.current= new Map({
      
      container: mapIdDiv,
        zoom: 4,
        center: [107.581450, 16.463698],
        style: "https://demotiles.maplibre.org/style.json",
      });
   
      const addMarker = (id) => {


        const marker = new maplibregl.Marker()
            .setLngLat([props.longitude, props.latitude])
            .setPopup(new maplibregl
            .Popup({ offset: 25,maxWidth:'200px' })
            .setHTML(`<h1>Thông tin</h1>
              <p>Province:${props.province}</p>
              <p>Disaster:${props.disaster}</p>
              <p>Date:From ${props.startdate} to ${props.enddate}</p>
              <p> Số lượng:${props.totalItems}</p>`))
            .addTo(mapRef.current);
        return marker;
    };
      if(props.urlFormat){
        console.log('ok')
        addMarker('marker1', 105.833701, 21.022895);
     
      }
  
      mapRef.current.on("load",()=>{
          mapRef.current.addSource(eeLayerId, {
            type: "raster",
            tiles: [props.urlFormat],
            tileSize: 256,
          });
      
          // After the source is added then add it as map layer
          mapRef.current.addLayer({
            type: "raster",
            source: eeLayerId,
            id: eeLayerId,
            minzoom: 0,
            maxzoom: 20,
          });
          const bounds =bbox(props.geojson);
          mapRef.current.fitBounds(bounds);
      
     
       
      })

      // axios.get("http://localhost:1513/todos/api/authenticate")
      // .then(api =>{setTileUrl(api.data.urlFormat);
      // setCenter(api.data.mageGeometryGeojson);
      // })
      // .catch(err=>console.log(err))
      return () => 
        mapRef.current.remove();
      
    }, [props]);


    console.log('prop',props)
    return (
  <div id={mapIdDiv} style={mapStyle}></div>
  
    //   <div >
      
    //   {/* <MapContainer center={[103.57567457694688, -1.5538708282870601]} zoom={13}>
    //     <TileLayer
    //        attribution='&copy; Google Earth Engine'
    //        url={tileUrl} 
  
    //     />
    //     <Marker position={[51.505, -0.09]}>
    //       <Popup>
    //         A pretty CSS3 popup! <br /> Easily customizable.
    //       </Popup>
    //     </Marker>
    //   </MapContainer> */}
  
    // </div>
    
         
      )
}

export default GoogleEarthEngineAnalysis
