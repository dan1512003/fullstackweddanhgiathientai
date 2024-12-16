
import React, { useEffect, useRef, useState }  from 'react'
import style from './googleearthengine.module.css'
import "./googleearthengine.module.css"
import 'leaflet/dist/leaflet.css';
import '../../index.css';
import axios from 'axios';
import { LngLat, Map } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css'
import maplibregl from 'maplibre-gl';
import { bbox } from '@turf/turf';
import { icon, rectangle } from 'leaflet';
import * as turf from '@turf/turf';


function GoogleEarthEngine (props) {
  const mapRef =useRef(null)
    const mapIdDiv = "map";
  
    const saltwaterLayerId = "saltwater";
    const droughtLayerId = "drought";
    const typhoonLayerId = "typhoon";
    const floodLayerId= "flood";
    const earthquakeId = "earthquke";
    const landslideId= "landslide";
    const mapStyle = {
      height: "100%",
      width: "100%",
    };
    useEffect(() => {
      mapRef.current= new Map({
      
        container: mapIdDiv,
          zoom: 4,
          center: [107.581450, 16.463698],
          style:  'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
        });
        if(props.dataLandslideOngoing.length !==0){
          props.dataLandslideOngoing.map((item)=>(
         
    
            item.coordinate.forEach((coordinate)=>{
              const el = document.createElement('img');
              el.className = 'marker';
              el.style.width='30px'
              el.style.height = '30px'
              el.style.borderRadius= '50%'
              el.style.cursor='pointer'
              el.style.padding='0'
              if(item.disaster==='Saltwater intrusion'){
              el.style.backgroundImage =`url("http://localhost:1513/upload/download5.png")`
              }
              if(item.disaster==='Typhoon'){
              el.style.backgroundImage =`url("http://localhost:1513/upload/download3.png")`
              }
              if(item.disaster==='Flood'){
                el.style.backgroundImage =`url("http://localhost:1513/upload/download2.png")`
                }
              if(item.disaster==='Earthquake'){
                el.style.backgroundImage =`url("http://localhost:1513/upload/download7.png")`
                }
              if(item.disaster==='Drought'){
                  el.style.backgroundImage =`url("http://localhost:1513/upload/download6.png")`
                  }
              if(item.disaster==='Landslide'){
                  el.style.backgroundImage =`url("http://localhost:1513/upload/download4.png")`
                  }
              el.style.backgroundSize = 'contain'
              el.style.backgroundPosition ='center center'
              el.style.backgroundRepeat = 'no-repeat'
              new maplibregl.Marker( {
             
                element: el,
               anchor: 'bottom',
               offset: [0, 5],
               color:'orange',
               
              
               
             })
             
                 .setLngLat([coordinate.longitude, coordinate.latitude])
                 .setPopup(new maplibregl
                 .Popup({ offset: 25,maxWidth:'200px' })
                 .setHTML(`<h1>Thông tin</h1>
                   <a  href='http://localhost:3000/pagedisaster?id=${item._id}&name=${item.province}'>${item.title}</a>
                  <p>District: ${coordinate.district}  </p>
                   <p>Province:${coordinate.province}</p>
                   <p>Disaster:${item.disaster}</p>
                   <p>Status: ${item.status} </p>
                  `))
                
                 .addTo(mapRef.current)
           
          })
              
         
            ))
        }
        if(props.dataLandslidePass.length !==0){
          props.dataLandslidePass.map((item)=>(
         
    
            item.coordinate.forEach((coordinate)=>{
              const el = document.createElement('img');
              el.className = 'marker';
              el.style.width='30px'
              el.style.height = '30px'
              el.style.borderRadius= '50%'
              el.style.cursor='pointer'
              el.style.padding='0'
              if(item.disaster==='Saltwater intrusion'){
              el.style.backgroundImage =`url("http://localhost:1513/upload/download5.png")`
              }
              if(item.disaster==='Typhoon'){
              el.style.backgroundImage =`url("http://localhost:1513/upload/download3.png")`
              }
              if(item.disaster==='Flood'){
                el.style.backgroundImage =`url("http://localhost:1513/upload/download2.png")`
                }
              if(item.disaster==='Earthquake'){
                el.style.backgroundImage =`url("http://localhost:1513/upload/download7.png")`
                }
              if(item.disaster==='Drought'){
                  el.style.backgroundImage =`url("http://localhost:1513/upload/download6.png")`
                  }
              if(item.disaster==='Landslide'){
                  el.style.backgroundImage =`url("http://localhost:1513/upload/download4.png")`
                  }
              el.style.backgroundSize = 'contain'
              el.style.backgroundPosition ='center center'
              el.style.backgroundRepeat = 'no-repeat'
              new maplibregl.Marker( {
             
                element: el,
               anchor: 'bottom',
               offset: [0, 5],
               color:'orange',
               
              
               
             })
             
                 .setLngLat([coordinate.longitude, coordinate.latitude])
                 .setPopup(new maplibregl
                 .Popup({ offset: 25,maxWidth:'200px' })
                 .setHTML(`<h1>Thông tin</h1>
                   <a  href='http://localhost:3000/pagedisaster?id=${item._id}&name=${item.province}'>${item.title}</a>
                   <p>District: ${coordinate.district}  </p>
                   <p>Province:${coordinate.province}</p>
                   <p>Disaster:${item.disaster}</p>
                   <p>Status: ${item.status} </p>
                  `))
                
                 .addTo(mapRef.current)
           
          })
              
         
            ))
        }
        if(props.dataEarthquakeOngoing.length !==0){
          props.dataEarthquakeOngoing.map((item)=>(
         
    
            item.coordinate.forEach((coordinate)=>{
              const el = document.createElement('img');
              el.className = 'marker';
              el.style.width='30px'
              el.style.height = '30px'
              el.style.borderRadius= '50%'
              el.style.cursor='pointer'
              el.style.padding='0'
              if(item.disaster==='Saltwater intrusion'){
              el.style.backgroundImage =`url("http://localhost:1513/upload/download5.png")`
              }
              if(item.disaster==='Typhoon'){
              el.style.backgroundImage =`url("http://localhost:1513/upload/download3.png")`
              }
              if(item.disaster==='Flood'){
                el.style.backgroundImage =`url("http://localhost:1513/upload/download2.png")`
                }
              if(item.disaster==='Earthquake'){
                el.style.backgroundImage =`url("http://localhost:1513/upload/download7.png")`
                }
              if(item.disaster==='Drought'){
                  el.style.backgroundImage =`url("http://localhost:1513/upload/download6.png")`
                  }
              if(item.disaster==='Landslide'){
                  el.style.backgroundImage =`url("http://localhost:1513/upload/download4.png")`
                  }
              el.style.backgroundSize = 'contain'
              el.style.backgroundPosition ='center center'
              el.style.backgroundRepeat = 'no-repeat'
              new maplibregl.Marker( {
             
                element: el,
               anchor: 'bottom',
               offset: [0, 5],
               color:'orange',
               
              
               
             })
             
                 .setLngLat([coordinate.longitude, coordinate.latitude])
                 .setPopup(new maplibregl
                 .Popup({ offset: 25,maxWidth:'200px' })
                 .setHTML(`<h1>Thông tin</h1>
                   <a  href='http://localhost:3000/pagedisaster?id=${item._id}&name=${item.province}'>${item.title}</a>
                  <p>District: ${coordinate.district}  </p>
                   <p>Province:${coordinate.province}</p>
                   <p>Disaster:${item.disaster}</p>
                   <p>Status: ${item.status} </p>
                  `))
                
                 .addTo(mapRef.current)
           
          })
              
         
            ))
        }
        if(props.dataEarthquakePass.length !==0){
          props.dataEarthquakePass.map((item)=>(
         
    
            item.coordinate.forEach((coordinate)=>{
              const el = document.createElement('img');
              el.className = 'marker';
              el.style.width='30px'
              el.style.height = '30px'
              el.style.borderRadius= '50%'
              el.style.cursor='pointer'
              el.style.padding='0'
              if(item.disaster==='Saltwater intrusion'){
              el.style.backgroundImage =`url("http://localhost:1513/upload/download5.png")`
              }
              if(item.disaster==='Typhoon'){
              el.style.backgroundImage =`url("http://localhost:1513/upload/download3.png")`
              }
              if(item.disaster==='Flood'){
                el.style.backgroundImage =`url("http://localhost:1513/upload/download2.png")`
                }
              if(item.disaster==='Earthquake'){
                el.style.backgroundImage =`url("http://localhost:1513/upload/download7.png")`
                }
              if(item.disaster==='Drought'){
                  el.style.backgroundImage =`url("http://localhost:1513/upload/download6.png")`
                  }
              if(item.disaster==='Landslide'){
                  el.style.backgroundImage =`url("http://localhost:1513/upload/download4.png")`
                  }
              el.style.backgroundSize = 'contain'
              el.style.backgroundPosition ='center center'
              el.style.backgroundRepeat = 'no-repeat'
              new maplibregl.Marker( {
             
                element: el,
               anchor: 'bottom',
               offset: [0, 5],
               color:'orange',
               
              
               
             })
             
                 .setLngLat([coordinate.longitude, coordinate.latitude])
                 .setPopup(new maplibregl
                 .Popup({ offset: 25,maxWidth:'200px' })
                 .setHTML(`<h1>Thông tin</h1>
                   <a  href='http://localhost:3000/pagedisaster?id=${item._id}&name=${item.province}'>${item.title}</a>
                   <p>District: ${coordinate.district}  </p>
                   <p>Province:${coordinate.province}</p>
                   <p>Disaster:${item.disaster}</p>
                   <p>Status: ${item.status} </p>
                  `))
                
                 .addTo(mapRef.current)
           
          })
              
         
            ))
        }

        if(props.dataFloodOngoing.length !==0){
          props.dataFloodOngoing.map((item)=>(
         
    
            item.coordinate.forEach((coordinate)=>{
              const el = document.createElement('img');
              el.className = 'marker';
              el.style.width='30px'
              el.style.height = '30px'
              el.style.borderRadius= '50%'
              el.style.cursor='pointer'
              el.style.padding='0'
              if(item.disaster==='Saltwater intrusion'){
              el.style.backgroundImage =`url("http://localhost:1513/upload/download5.png")`
              }
              if(item.disaster==='Typhoon'){
              el.style.backgroundImage =`url("http://localhost:1513/upload/download3.png")`
              }
              if(item.disaster==='Flood'){
                el.style.backgroundImage =`url("http://localhost:1513/upload/download2.png")`
                }
              if(item.disaster==='Earthquake'){
                el.style.backgroundImage =`url("http://localhost:1513/upload/download7.png")`
                }
              if(item.disaster==='Drought'){
                  el.style.backgroundImage =`url("http://localhost:1513/upload/download6.png")`
                  }
              if(item.disaster==='Landslide'){
                  el.style.backgroundImage =`url("http://localhost:1513/upload/download4.png")`
                  }
              el.style.backgroundSize = 'contain'
              el.style.backgroundPosition ='center center'
              el.style.backgroundRepeat = 'no-repeat'
              new maplibregl.Marker( {
             
                element: el,
               anchor: 'bottom',
               offset: [0, 5],
               color:'orange',
               
              
               
             })
             
                 .setLngLat([coordinate.longitude, coordinate.latitude])
                 .setPopup(new maplibregl
                 .Popup({ offset: 25,maxWidth:'200px' })
                 .setHTML(`<h1>Thông tin</h1>
                   <a  href='http://localhost:3000/pagedisaster?id=${item._id}&name=${item.province}'>${item.title}</a>
                  <p>District: ${coordinate.district}  </p>
                   <p>Province:${coordinate.province}</p>
                   <p>Disaster:${item.disaster}</p>
                   <p>Status: ${item.status} </p>
                  `))
                
                 .addTo(mapRef.current)
           
          })
              
         
            ))
        }
        if(props.dataFloodPass.length !==0){
          props.dataFloodPass.map((item)=>(
         
    
            item.coordinate.forEach((coordinate)=>{
              const el = document.createElement('img');
              el.className = 'marker';
              el.style.width='30px'
              el.style.height = '30px'
              el.style.borderRadius= '50%'
              el.style.cursor='pointer'
              el.style.padding='0'
              if(item.disaster==='Saltwater intrusion'){
              el.style.backgroundImage =`url("http://localhost:1513/upload/download5.png")`
              }
              if(item.disaster==='Typhoon'){
              el.style.backgroundImage =`url("http://localhost:1513/upload/download3.png")`
              }
              if(item.disaster==='Flood'){
                el.style.backgroundImage =`url("http://localhost:1513/upload/download2.png")`
                }
              if(item.disaster==='Earthquake'){
                el.style.backgroundImage =`url("http://localhost:1513/upload/download7.png")`
                }
              if(item.disaster==='Drought'){
                  el.style.backgroundImage =`url("http://localhost:1513/upload/download6.png")`
                  }
              if(item.disaster==='Landslide'){
                  el.style.backgroundImage =`url("http://localhost:1513/upload/download4.png")`
                  }
              el.style.backgroundSize = 'contain'
              el.style.backgroundPosition ='center center'
              el.style.backgroundRepeat = 'no-repeat'
              new maplibregl.Marker( {
             
                element: el,
               anchor: 'bottom',
               offset: [0, 5],
               color:'orange',
               
              
               
             })
             
                 .setLngLat([coordinate.longitude, coordinate.latitude])
                 .setPopup(new maplibregl
                 .Popup({ offset: 25,maxWidth:'200px' })
                 .setHTML(`<h1>Thông tin</h1>
                   <a  href='http://localhost:3000/pagedisaster?id=${item._id}&name=${item.province}'>${item.title}</a>
                   <p>District: ${coordinate.district}  </p>
                   <p>Province:${coordinate.province}</p>
                   <p>Disaster:${item.disaster}</p>
                   <p>Status: ${item.status} </p>
                  `))
                
                 .addTo(mapRef.current)
           
          })
              
         
            ))
        }


      if(props.dataSaltWaterOngoing.length !==0){
        props.dataSaltWaterOngoing.map((item)=>(
       
  
          item.coordinate.forEach((coordinate)=>{
            const el = document.createElement('img');
            el.className = 'marker';
            el.style.width='30px'
            el.style.height = '30px'
            el.style.borderRadius= '50%'
            el.style.cursor='pointer'
            el.style.padding='0'
            if(item.disaster==='Saltwater intrusion'){
            el.style.backgroundImage =`url("http://localhost:1513/upload/download5.png")`
            }
            if(item.disaster==='Typhoon'){
            el.style.backgroundImage =`url("http://localhost:1513/upload/download3.png")`
            }
            if(item.disaster==='Flood'){
              el.style.backgroundImage =`url("http://localhost:1513/upload/download2.png")`
              }
            if(item.disaster==='Earthquake'){
              el.style.backgroundImage =`url("http://localhost:1513/upload/download7.png")`
              }
            if(item.disaster==='Drought'){
                el.style.backgroundImage =`url("http://localhost:1513/upload/download6.png")`
                }
            if(item.disaster==='Landslide'){
                el.style.backgroundImage =`url("http://localhost:1513/upload/download4.png")`
                }
            el.style.backgroundSize = 'contain'
            el.style.backgroundPosition ='center center'
            el.style.backgroundRepeat = 'no-repeat'
            new maplibregl.Marker( {
           
              element: el,
             anchor: 'bottom',
             offset: [0, 5],
             color:'orange',
             
            
             
           })
           
               .setLngLat([coordinate.longitude, coordinate.latitude])
               .setPopup(new maplibregl
               .Popup({ offset: 25,maxWidth:'200px' })
               .setHTML(`<h1>Thông tin</h1>
                 <a  href='http://localhost:3000/pagedisaster?id=${item._id}&name=${item.province}'>${item.title}</a>
                <p>District: ${coordinate.district}  </p>
                 <p>Province:${coordinate.province}</p>
                 <p>Disaster:${item.disaster}</p>
                 <p>Status: ${item.status} </p>
                `))
              
               .addTo(mapRef.current)
         
        })
            
       
          ))
      }
      if(props.dataSaltWaterPass.length !==0){
        props.dataSaltWaterPass.map((item)=>(
       
  
          item.coordinate.forEach((coordinate)=>{
            const el = document.createElement('img');
            el.className = 'marker';
            el.style.width='30px'
            el.style.height = '30px'
            el.style.borderRadius= '50%'
            el.style.cursor='pointer'
            el.style.padding='0'
            if(item.disaster==='Saltwater intrusion'){
            el.style.backgroundImage =`url("http://localhost:1513/upload/download5.png")`
            }
            if(item.disaster==='Typhoon'){
            el.style.backgroundImage =`url("http://localhost:1513/upload/download3.png")`
            }
            if(item.disaster==='Flood'){
              el.style.backgroundImage =`url("http://localhost:1513/upload/download2.png")`
              }
            if(item.disaster==='Earthquake'){
              el.style.backgroundImage =`url("http://localhost:1513/upload/download7.png")`
              }
            if(item.disaster==='Drought'){
                el.style.backgroundImage =`url("http://localhost:1513/upload/download6.png")`
                }
            if(item.disaster==='Landslide'){
                el.style.backgroundImage =`url("http://localhost:1513/upload/download4.png")`
                }
            el.style.backgroundSize = 'contain'
            el.style.backgroundPosition ='center center'
            el.style.backgroundRepeat = 'no-repeat'
            new maplibregl.Marker( {
           
              element: el,
             anchor: 'bottom',
             offset: [0, 5],
             color:'orange',
             
            
             
           })
           
               .setLngLat([coordinate.longitude, coordinate.latitude])
               .setPopup(new maplibregl
               .Popup({ offset: 25,maxWidth:'200px' })
               .setHTML(`<h1>Thông tin</h1>
                 <a  href='http://localhost:3000/pagedisaster?id=${item._id}&name=${item.province}'>${item.title}</a>
                 <p>District: ${coordinate.district}  </p>
                 <p>Province:${coordinate.province}</p>
                 <p>Disaster:${item.disaster}</p>
                 <p>Status: ${item.status} </p>
                `))
              
               .addTo(mapRef.current)
         
        })
            
       
          ))
      }
      if(props.dataDroughtOngoing.length !==0){
        props.dataDroughtOngoing.map((item)=>(
       
  
          item.coordinate.forEach((coordinate)=>{
            const el = document.createElement('img');
            el.className = 'markerdrought';
            el.style.width='30px'
            el.style.height = '30px'
            el.style.borderRadius= '50%'
            el.style.cursor='pointer'
            el.style.padding='0'
            if(item.disaster==='Saltwater intrusion'){
            el.style.backgroundImage =`url("http://localhost:1513/upload/download5.png")`
            }
            if(item.disaster==='Typhoon'){
            el.style.backgroundImage =`url("http://localhost:1513/upload/download3.png")`
            }
            if(item.disaster==='Flood'){
              el.style.backgroundImage =`url("http://localhost:1513/upload/download2.png")`
              }
            if(item.disaster==='Earthquake'){
              el.style.backgroundImage =`url("http://localhost:1513/upload/download7.png")`
              }
            if(item.disaster==='Drought'){
                el.style.backgroundImage =`url("http://localhost:1513/upload/download6.png")`
                }
            if(item.disaster==='Landslide'){
                el.style.backgroundImage =`url("http://localhost:1513/upload/download4.png")`
                }
            el.style.backgroundSize = 'contain'
            el.style.backgroundPosition ='center center'
            el.style.backgroundRepeat = 'no-repeat'
            new maplibregl.Marker( {
           
              element: el,
             anchor: 'bottom',
             offset: [0, 5],
             color:'orange',
             
            
             
           })
           
               .setLngLat([coordinate.longitude, coordinate.latitude])
               .setPopup(new maplibregl
               .Popup({ offset: 25,maxWidth:'200px' })
               .setHTML(`<h1>Thông tin</h1>
                 <a  href='http://localhost:3000/pagedisaster?id=${item._id}&name=${item.province}'>${item.title}</a>
                 <p>District: ${coordinate.district}  </p>
                 <p>Province:${coordinate.province}</p>
                 <p>Disaster:${item.disaster}</p>
                 <p>Status: ${item.status} </p>
                `))
              
               .addTo(mapRef.current)
         
        })
            
       
          ))
      }
      if(props.dataDroughtPass.length !==0){
        props.dataDroughtPass.map((item)=>(
       
  
          item.coordinate.forEach((coordinate)=>{
            const el = document.createElement('img');
            el.className = 'markerdrought';
            el.style.width='30px'
            el.style.height = '30px'
            el.style.borderRadius= '50%'
            el.style.cursor='pointer'
            el.style.padding='0'
            if(item.disaster==='Saltwater intrusion'){
            el.style.backgroundImage =`url("http://localhost:1513/upload/download5.png")`
            }
            if(item.disaster==='Typhoon'){
            el.style.backgroundImage =`url("http://localhost:1513/upload/download3.png")`
            }
            if(item.disaster==='Flood'){
              el.style.backgroundImage =`url("http://localhost:1513/upload/download2.png")`
              }
            if(item.disaster==='Earthquake'){
              el.style.backgroundImage =`url("http://localhost:1513/upload/download7.png")`
              }
            if(item.disaster==='Drought'){
                el.style.backgroundImage =`url("http://localhost:1513/upload/download6.png")`
                }
            if(item.disaster==='Landslide'){
                el.style.backgroundImage =`url("http://localhost:1513/upload/download4.png")`
                }
            el.style.backgroundSize = 'contain'
            el.style.backgroundPosition ='center center'
            el.style.backgroundRepeat = 'no-repeat'
            new maplibregl.Marker( {
           
              element: el,
             anchor: 'bottom',
             offset: [0, 5],
             color:'orange',
             
            
             
           })
           
               .setLngLat([coordinate.longitude, coordinate.latitude])
               .setPopup(new maplibregl
               .Popup({ offset: 25,maxWidth:'200px' })
               .setHTML(`<h1>Thông tin</h1>
                 <a  href='http://localhost:3000/pagedisaster?id=${item._id}&name=${item.province}'>${item.title}</a>
                 <p>District: ${coordinate.district}  </p>
                 <p>Province:${coordinate.province}</p>
                 <p>Disaster:${item.disaster}</p>
                 <p>Status: ${item.status} </p>
                `))
              
               .addTo(mapRef.current)
         
        })
            
       
          ))
      }
   
      if(props.dataTyphoonOngoing.length !==0){
        props.dataTyphoonOngoing.map((item)=>(
       
  
          item.coordinate.forEach((coordinate)=>{
            const el = document.createElement('img');
            el.className = 'markerdrought';
            el.style.width='30px'
            el.style.height = '30px'
            el.style.borderRadius= '50%'
            el.style.cursor='pointer'
            el.style.padding='0'
            if(item.disaster==='Saltwater intrusion'){
            el.style.backgroundImage =`url("http://localhost:1513/upload/download5.png")`
            }
            if(item.disaster==='Typhoon'){
            el.style.backgroundImage =`url("http://localhost:1513/upload/download3.png")`
            }
            if(item.disaster==='Flood'){
              el.style.backgroundImage =`url("http://localhost:1513/upload/download2.png")`
              }
            if(item.disaster==='Earthquake'){
              el.style.backgroundImage =`url("http://localhost:1513/upload/download7.png")`
              }
            if(item.disaster==='Drought'){
                el.style.backgroundImage =`url("http://localhost:1513/upload/download6.png")`
                }
            if(item.disaster==='Landslide'){
                el.style.backgroundImage =`url("http://localhost:1513/upload/download4.png")`
                }
            el.style.backgroundSize = 'contain'
            el.style.backgroundPosition ='center center'
            el.style.backgroundRepeat = 'no-repeat'
            new maplibregl.Marker( {
           
              element: el,
             anchor: 'bottom',
             offset: [0, 5],
             color:'orange',
             
            
             
           })
           
               .setLngLat([coordinate.longitude, coordinate.latitude])
               .setPopup(new maplibregl
               .Popup({ offset: 25,maxWidth:'200px' })
               .setHTML(`<h1>Thông tin</h1>
                 <a  href='http://localhost:3000/pagedisaster?id=${item._id}&name=${item.province}'>${item.title}</a>
                 <p>Province:${coordinate.province}</p>
                 <p>Disaster:${item.disaster}</p>
                 <p>Status: ${item.status} </p>
                `))
              
               .addTo(mapRef.current)
         
        })
            
       
          ))
      }
      if(props.dataTyphoonPass.length !==0){
        props.dataTyphoonPass.map((item)=>(
       
  
          item.coordinate.forEach((coordinate)=>{
            const el = document.createElement('img');
            el.className = 'markerdrought';
            el.style.width='30px'
            el.style.height = '30px'
            el.style.borderRadius= '50%'
            el.style.cursor='pointer'
            el.style.padding='0'
            if(item.disaster==='Saltwater intrusion'){
            el.style.backgroundImage =`url("http://localhost:1513/upload/download5.png")`
            }
            if(item.disaster==='Typhoon'){
            el.style.backgroundImage =`url("http://localhost:1513/upload/download3.png")`
            }
            if(item.disaster==='Flood'){
              el.style.backgroundImage =`url("http://localhost:1513/upload/download2.png")`
              }
            if(item.disaster==='Earthquake'){
              el.style.backgroundImage =`url("http://localhost:1513/upload/download7.png")`
              }
            if(item.disaster==='Drought'){
                el.style.backgroundImage =`url("http://localhost:1513/upload/download6.png")`
                }
            if(item.disaster==='Landslide'){
                el.style.backgroundImage =`url("http://localhost:1513/upload/download4.png")`
                }
            el.style.backgroundSize = 'contain'
            el.style.backgroundPosition ='center center'
            el.style.backgroundRepeat = 'no-repeat'
            new maplibregl.Marker( {
           
              element: el,
             anchor: 'bottom',
             offset: [0, 5],
             color:'orange',
             
            
             
           })
           
               .setLngLat([coordinate.longitude, coordinate.latitude])
               .setPopup(new maplibregl
               .Popup({ offset: 25,maxWidth:'200px' })
               .setHTML(`<h1>Thông tin</h1>
                 <a  href='http://localhost:3000/pagedisaster?id=${item._id}&name=${item.province}'>${item.title}</a>
                 <p>Disaster:${item.disaster}</p>
                 <p>Province:${coordinate.province}</p>
                 <p>Status: ${item.status} </p>
                `))
              
               .addTo(mapRef.current)
         
        })
            
       
          ))
      }
 
      
        
       mapRef.current.on("load",()=>{
        mapRef.current.addSource(landslideId, {
          type: "raster",
          tiles: [props.urlFormatLandslide],
          tileSize: 256,
        });
   
        // After the source is added then add it as map layer
        mapRef.current.addLayer({
          type: "raster",
          source: landslideId,
          id: landslideId,
          minzoom: 0,
          maxzoom: 20,
        });


        mapRef.current.addSource(earthquakeId, {
          type: "raster",
          tiles: [props.urlFormatEarthquake],
          tileSize: 256,
        });
   
        // After the source is added then add it as map layer
        mapRef.current.addLayer({
          type: "raster",
          source: earthquakeId,
          id: earthquakeId,
          minzoom: 0,
          maxzoom: 20,
        });



        mapRef.current.addSource(floodLayerId, {
          type: "raster",
          tiles: [props.urlFormatFlood],
          tileSize: 256,
        });
   
        // After the source is added then add it as map layer
        mapRef.current.addLayer({
          type: "raster",
          source: floodLayerId,
          id: floodLayerId,
          minzoom: 0,
          maxzoom: 20,
        });

        
    
        mapRef.current.addSource(saltwaterLayerId, {
          type: "raster",
          tiles: [props.urlFormatSaltwater],
          tileSize: 256,
        });
   
        // After the source is added then add it as map layer
        mapRef.current.addLayer({
          type: "raster",
          source: saltwaterLayerId,
          id: saltwaterLayerId,
          minzoom: 0,
          maxzoom: 20,
        });
  
        mapRef.current.addSource(droughtLayerId, {
          type: "raster",
          tiles: [props.urlFormatDrought],
          tileSize: 256,
        });
   
        // After the source is added then add it as map layer
        mapRef.current.addLayer({
          type: "raster",
          source: droughtLayerId,
          id: droughtLayerId,
          
          minzoom: 0,
          maxzoom: 20,
        });

        mapRef.current.addSource(typhoonLayerId, {
          type: "raster",
          tiles: [props.urlFormatTyphoon],
          tileSize: 256,
        });
   
        // After the source is added then add it as map layer
        mapRef.current.addLayer({
          type: "raster",
          source: typhoonLayerId,
          id: typhoonLayerId,
          minzoom: 0,
          maxzoom: 20,
        });
          const bounds =bbox(props.geojsonDrought);
          mapRef.current.fitBounds(bounds);
          const boundsFlood =bbox(props.geojsonFlood);
          mapRef.current.fitBounds(boundsFlood);
          const boundsEarthquake =bbox(props.geojsonEarthquake);
          mapRef.current.fitBounds(boundsEarthquake);
          const boundsLandslide=bbox(props.geojsonLandslide);
          mapRef.current.fitBounds(boundsLandslide);
      })

      return () => 
        mapRef.current.remove();
 
  },[props]);

 


//  const fetchCoordinatesAndAddMarkers = async () => {
//   for (const marker of data) {
//     try {
//       const response = await axios.get('http://localhost:1513/todos/getapicoordinates', {
//         params: { province: marker.province },
//       });

//       setProvince(response)
// console.log('provinces :',provinces)
// for(const province of provinces){
//   new maplibregl.Marker()
//   .setLngLat([province.longitude, province.latitude])
//   .addTo(map);
// }
      
    
       
   
//     } catch (error) {
//       console.error('Error fetching coordinates:', error);
//     }
//   }
// };

// fetchCoordinatesAndAddMarkers();

 
  
    


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

export default GoogleEarthEngine
