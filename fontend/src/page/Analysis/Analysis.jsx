import React, { useEffect, useState } from 'react'
import style from './analysis.module.css'
import img from '../../assets/img/sieu-bao-yagi-anh-huong-den-khu-vuc-nam-bo.jpg'
import { Link, useNavigate } from "react-router-dom";
import GoogleEarthEngine from '../../components/GoogleEarthEngine/GoogleEarthEngine';
import axios, { Axios } from 'axios';
import GoogleEarthEngineAnalysis from '../../components/googleearthengineanalysis/GoogleEarthEngineAnalysis';
const Analysis = () => {
  const [level,setlevel]=useState('')
  const [status,setStatus] =useState('')
  const [provinceValueSelect,setProvinceValueSelect]=useState([])
  const [disasterValueSelect,setDisasterValueSelect] =useState([])
  const [province,setProvince]=useState([])
  const [disaster,setDisaster] =useState([])
  const [startDate,setStartDate]=useState('')
  const [endDate,setEndDate] =useState('')
  const [urlFormat,setUrlFormat] =useState('')
  const [geojson,setGeojson] =useState('')
  const [longitude,setLongitude] =useState('')
  const [latitude,setLatitude] =useState('')
  const [totalItems,setTotalItems] =useState('')
  const [ratio,setRatio] =useState('')
  const [performance,setPerformance] =useState('')
  const [fetch,setFetch]=useState(false)
  const [data,setData] =useState([])
  const navigate=useNavigate()
  useEffect(()=>{
    axios.get("http://localhost:1513/todos/getapicountry")
    .then(province =>setProvince(province.data))
    .catch(err=>console.log(err))
    axios.get("http://localhost:1513/todos/getapitypedisaster")
    .then(disaster =>setDisaster(disaster.data))
    .catch(err=>console.log(err))
  


  },[])
  const fetchItems = async () => {
    console.log('hàm fetchItems được gọi')
    try {
   
      const response = await axios.get('http://localhost:1513/todos/getapianalysis', {
        params: {
          disaster: disasterValueSelect, 
          province: provinceValueSelect,
          startdate:startDate,
          enddate:endDate,
        }
      });
      setUrlFormat(response.data.urlFormat); 
      setGeojson(response.data.geojson) 
      setLongitude(response.data.longitude)
      setLatitude(response.data.latitude)
      setTotalItems(response.data.totalItems)
      setRatio(response.data.ratio)
      setPerformance(response.data.performance)
      setlevel(response.data.level)
      setData(response.data.data)
   
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleFilterNew=()=>{
    fetch?setFetch(false):setFetch(true)
    fetchItems()
    console.log('hàm handleFilterNew được gọi',handleFilterNew)
 


  }

  console.log('province',provinceValueSelect)
  console.log('disaster',disasterValueSelect)
  console.log('startDate',startDate)
  console.log('endDate',endDate)
  console.log('data:',data)

  console.log('url:',urlFormat)
  console.log('geojson:',geojson)
  console.log('longitude:',longitude)
  console.log('latitude:',latitude)
  console.log('totalItems:',totalItems)
  console.log('ratio:',ratio)

  return (
    <div className={style.containerAnalysis}>
   <div className={style.main}>
    <div className={style.header}></div>
    <div className={style.product}>
      <div  className={style.apiGoogleEarthEngine}> 
        <GoogleEarthEngineAnalysis 
        urlFormat={urlFormat}
        geojson={geojson}
        latitude={latitude}
        longitude={longitude}
        totalItems={totalItems}
        startdate={startDate}
        enddate={endDate}
        province={provinceValueSelect}
        disaster={disasterValueSelect}
         /> </div>
<div className={style.filter}> 
  <div></div>
  
<div>
        <p>COUNTRY:</p>
      <select className={style.selectFilterCountry} value={provinceValueSelect} onChange={(e)=>{setProvinceValueSelect(e.target.value)}} required>
      <option>--select province--</option>
      {province.map((province,index)=>(

<option value={province.provincedetail} key={index}>{province.provincedetail}</option>

))}
     
     
 </select> 



      </div>

      <div>
        <p>DISASTER:</p>
      <select className={style.selectFilterDisaster} value={disasterValueSelect} onChange={(e)=>{setDisasterValueSelect(e.target.value)}} required>
      <option>--select disaster--</option>
      {disaster.map((disaster,index)=>(

<option value={disaster.disaster} key={index}>{disaster.disaster}</option>

))}
 </select> 



      </div>

<div >
<p>DATE:</p>
<ul className={style.ulTime}>
  <li className={style.liTime}>
 From
     <input type="date" 
     value={startDate}
     onChange={(e)=>{setStartDate(e.target.value)}} required/>
  </li>

  <li className={style.liTime}>to
    <input type="date"
value={endDate}
onChange={(e)=>{setEndDate(e.target.value)}} required/>

</li>

</ul>
</div>
<div className={style.classbuttonAnalysis}>
<button onClick={handleFilterNew} className={style.onClickAnalysis}>Analysis</button>

</div>
<div></div>
</div>
<div className={style.sub1}>
<div className={style.tiltelsub1}> 
<h2 style={{borderBottom:'1px solid red'}}>Analysis</h2>
<ul className={style.infoFilter}>
  <li className={style.liinfoFilter}> 
<p> Province:</p>
<p>{provinceValueSelect}</p>
  </li>

  <li className={style.liinfoFilter}>
<p> Disaster Type:</p>
<p>{disasterValueSelect}</p>
  </li>

  <li className={style.liinfoFilter}>

<p>From:{startDate}</p>
<p style={{marginLeft:"3px"}}>to:{endDate}</p>
  </li>

</ul>
<div className={style.containerAnalysissub1}>
<div className={style.occurrences}>
<p className={style.poccurrences}>Total number of occurrences </p>
<div className={style.resultOccurrences}>
<p > {totalItems}</p>

</div>

</div>

<div  className={style.performance}>
<p className={style.pperformance}> Performance </p>
<div className={style.resultPerformance}>
<p >
  {performance}
  </p>

</div>

</div>

<div className={style.level}>
<p className={style.plevel}>Level</p>
<div className={style.resultLevel}>  
  <p className={level ==="danger"? style.danger : style.safe}></p>
<p >{level}</p>
    </div>

</div>


</div>
</div>

<div className={style.tiltelsub2}>
<h2 style={{borderBottom:'1px solid red'}}>Detail</h2>
{data.map((newdisaster)=>(
  <div className={style.cardDisater}>


<div className={style.mainCarDisater}> 
<img className={style.imgHeaderCardDisaster} src={`http://localhost:1513/upload/${newdisaster.icon}`}alt="Description for img " />
<button onClick={()=> navigate( `/pagedisaster?id=${newdisaster._id}&name=${newdisaster.province}`)} style={{backgroundColor:'white'}} to="/pagedisaster">
    <p  className={style.descHeaderCardDisater}> {newdisaster.title}
    </p>
    </button>
</div>

<div className={style.footerCardDisater}> 
<ul className= {style.ulFooterCarDisaster}>
<li className= {style.liFooterDisaster} >
{ status===`${newdisaster.status}` ? (<p className={style.statusOngoinCarDisaster}></p>):(<p className={style.statusAlertCardNews}></p>)}
  
  <p className={style.statusCardNews}>{newdisaster.status} </p>
  </li>

    <li className= {style.liFooterDisaster}>
    <p className={style.typeDisasterCardNews}>Disaster:</p>
    <p>{newdisaster.disaster}</p>
    </li>
  
    <li className= {style.liFooterDisaster}>
    <p className={style.postedCardNews}>Affected country</p>
    <p>{newdisaster.province}</p>
    </li>



</ul>
</div>

    </div>

))}

</div>
</div>

<div>

</div>
    </div>
    <div className={style.footer}></div>
     </div>
    </div>
  )
}

export default Analysis

