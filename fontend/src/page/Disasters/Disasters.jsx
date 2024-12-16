import React, { useEffect } from 'react'
import style from './disasters.module.css'
import {  useState } from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faTimes } from '@fortawesome/free-solid-svg-icons'; 
import { Link, useNavigate } from "react-router-dom";
import GoogleEarthEngine from '../../components/GoogleEarthEngine/GoogleEarthEngine';
import Test from '../../components/GoogleEarthEngine/Test';
import img from '../../assets/img/sieu-bao-yagi-anh-huong-den-khu-vuc-nam-bo.jpg'
import axios from 'axios';

const Disasters = () => {
  const [valueStatus,setValueStatus] = useState([])

    const [valueDisaster,setValueDisaster] = useState([])
    const [valueCountry,setValueCountry] = useState([])
    const [search,setsearch]=useState();
    const [activeLink, setActiveLink] = useState('');
    const [selectedValueStatus, setSelectedValueStatus] = useState('');
    const [selectedValueDisaster, setSelectedValueDisaster] = useState('');
    const [status,setStatus] =useState('Ongoing')
    const [suggestions, setSuggestions] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [localNew, setLocalNew] = useState([]);
    // const [country,setCountry]=useState([]);
    const [disaster,setDisaster]=useState([]);
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0); 
    const [currentPageFilter, setCurrentPageFilter] = useState(1);
    const [totalPagesFilter, setTotalPagesFilter] = useState(0); 
    const itemsPerPage = 2;   
    const[filter,setFilter] =useState(false)
    var [newsDisaster,setNewsDisaster]=useState([]);
    const [data,setData] =useState([])
    const navigate = useNavigate()
    const [dataSaltWaterOngoing,setDataSaltWaterOngoing] =useState([])
    const [dataSaltWaterPass,setDataSaltWaterPass] =useState([])
    const [urlFormatSaltwater,setUrlFormatSalttwater] =useState('')
    const [geojsonSaltwater,setGeojsonSaltwater] =useState('')
    const [dataDroughtOngoing,setDroughtOngoing] =useState([])
    const [dataDroughtPass,setDataDroughtPass] =useState([])
    const [urlDrought,setUrlDrought] =useState('')
    const [geojsonDrought,setGeojsonDrought] =useState('')
    const [dataTyphoonOngoing,setDataTyphoonOngoing] =useState([])
    const [dataTyphoonPass,setDataTyphoonPass] =useState([])
    const [urlTyphoon,setUrlTyphoon] =useState('')
    const [geojsonTyphoon,setGeojsonTyphoon] =useState('')
    const [urlEarthquake,setUrlEarthquake] =useState('')
    const [geojsonEarthquake,setGeojsonEarthquake] =useState('')
    const [dataEartquakeOngoing,setDataEarthquakeOngoing] =useState([])
    const [dataEarthquakePass,setDataEarthquakePass] =useState([])
    const [urlFlood,setUrlFlood] =useState('')
    const [geojsonFlood,setGeojsonFlood] =useState('')
    const [dataFloodOngoing,setDataFloodOngoing] =useState([])
    const [dataFloodPass,setDataFloodPass] =useState([])
    const [urlLandslide,setUrlLandslide] =useState('')
    const [geojsonLandslide,setGeojsonLandslide] =useState('')
    const [dataLandslideOngoing,setDataLandslideOngoing] =useState([])
    const [dataLandslidePass,setDataLandslidePass] =useState([])
    axios.get("http://localhost:1513/todos/getapicoordinates")
    .then(data =>{
      setData(data.data.data);
    })
   .catch(err=>console.log(err))
    useEffect(()=>{
      console.log('current Page Api New',currentPage)
      axios.get("http://localhost:1513/todos/getapinewdisaster",{
      params: {
        limit:itemsPerPage,
        currentpage:currentPage,
      }
    })
  
  .then(New =>{setNewsDisaster(New.data.data)
    setLocalNew(New.data.data)
    setTotalPages(New.data.totalPages); 
    setCurrentPage(New.data.currentPage); 
    console.log(totalPages)
    console.log(currentPage)
  })
  .catch(err=>console.log(err))
  
  // axios.get("http://localhost:1513/todos/getapicountry")
  // .then(country =>setCountry(country.data))
  // .catch(err=>console.log(err))
  
  axios.get("http://localhost:1513/todos/getapitypedisaster")
  .then(disaster =>setDisaster(disaster.data))
  .catch(err=>console.log(err))
  axios.get('http://localhost:1513/todos/getapisaltwaterintrusion')
  .then(data=>{setUrlFormatSalttwater(data.data.urlFormat);
               setGeojsonSaltwater(data.data.geojson);
               setDataSaltWaterOngoing(data.data.dataongoing)
               setDataSaltWaterPass(data.data.datapass)
  })
  .catch(err=>console.log(err))

  axios.get('http://localhost:1513/todos/getapidrought')
  .then(data=>{setUrlDrought(data.data.urlFormat);
               setGeojsonDrought(data.data.geojson);
              setDroughtOngoing(data.data.dataongoing)
               setDataDroughtPass(data.data.datapass)
  })
  .catch(err=>console.log(err))

  axios.get('http://localhost:1513/todos/getapityphoon')
  .then(data=>{setUrlTyphoon(data.data.urlFormat);
               setGeojsonTyphoon(data.data.geojson);
               setDataTyphoonOngoing(data.data.dataongoing)
               setDataTyphoonPass(data.data.datapass)
  })
  .catch(err=>console.log(err))

  axios.get('http://localhost:1513/todos/getapiearthquake')
  .then(data=>{setUrlEarthquake(data.data.urlFormat);
               setGeojsonEarthquake(data.data.geojson);
               setDataEarthquakeOngoing(data.data.dataongoing)
               setDataEarthquakePass(data.data.datapass)
  })
  .catch(err=>console.log(err))

  axios.get('http://localhost:1513/todos/getapiflood')
  .then(data=>{
               setGeojsonFlood(data.data.geojson);
               setUrlFlood(data.data.urlFormat)
               setDataFloodOngoing(data.data.dataongoing)
               setDataFloodPass(data.data.datapass)
  })
  .catch(err=>console.log(err))

  axios.get('http://localhost:1513/todos/getapilandslide')
  .then(data=>{setUrlLandslide(data.data.urlFormat);
               setGeojsonLandslide(data.data.geojson);
               setDataLandslideOngoing(data.data.dataongoing)
               setDataLandslidePass(data.data.datapass)
  })
  .catch(err=>console.log(err))


    },[currentPage,totalPages])

    const fetchItems = async (pageNumber) => {
      try {
      console.log('currentPage',currentPage)
        const response = await axios.get('http://localhost:1513/todos/getapifilternewdisaster', {
          params: {
            disaster: valueDisaster.join(','), 
            country: valueCountry.join(',') ,
            status: valueStatus.join(','),
            limit:itemsPerPage,
            currentpage:pageNumber,
          }
        });
        setNewsDisaster(response.data.data);  
        setTotalPagesFilter(response.data.totalPages); 
        setCurrentPageFilter(response.data.currentPage); 
        console.log('totalPages',totalPages)
        console.log(currentPage)
        console.log('item trả về là',items)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

  



    const handleInputChange = async (e) => {
      const value = e.target.value;
      setInputValue(value);
      if (value === '') {
        setSuggestions([]);
        return;
      }
    axios.get(`http://localhost:1513/todos/getapiautocomplete?q=${value}`)
   .then(data =>setSuggestions(data.data))
   .catch(err=>console.log(err))
    };
    const handleSuggestionClick = (suggestion) => {
      setInputValue(suggestion.provincedetail); 
      setSuggestions([]); 
    };



    const handleSetValue= () => {

   


      if(selectedValueStatus && !valueStatus.includes(selectedValueStatus) ){
          setValueStatus ([...valueStatus,selectedValueStatus ]);
         
      }
      else{
        console.log('value Content là rỗng') 
      }

      if(selectedValueDisaster && !valueDisaster.includes(selectedValueDisaster )){
          setValueDisaster([...valueDisaster,selectedValueDisaster]);
        
      }
      else{
        console.log('value Disaster là rỗng') 
      }
      
      if(inputValue && !valueCountry.includes(inputValue)){
        setValueCountry([...valueCountry,inputValue ])
        setsearch('')
       
    }
    else{
      console.log('value Country là rỗng') 
    }
  };
    const handleShowFilter= (link) => {
        setActiveLink(link);
        handleSetValue();
        setInputValue('')
        setSelectedValueStatus('')
        setSelectedValueDisaster('')
      };
  

      const handleADeleteValueCountry = (index) => {
        const valueCountryNew= [...valueCountry.slice(0, index), ...valueCountry.slice(index + 1)];
        setValueCountry(valueCountryNew);
      };
      const handleADeleteValueContent = (index) => {
        const valueStatusNew= [...valueStatus.slice(0, index), ...valueStatus.slice(index + 1)];
        setValueStatus(valueStatusNew);
      };
      const handleADeleteValueDisaster = (index) => {
        const valueDisasterNew= [...valueDisaster.slice(0, index), ...valueDisaster.slice(index + 1)];
        setValueDisaster(valueDisasterNew);
      };
const handleAllDelete=()=>{
   setValueStatus([])
    setValueCountry([])
    setValueDisaster([])
}

const handleFilterNew=(pageNumber)=>{
 
  setFilter(true)
  console.log('hàm handleFilterNew được gọi')
  fetchItems(pageNumber)
}


const handlePageChange = (pageNumber) => {
  console.log('hàm handlePageChange được gọi')
  setCurrentPage(pageNumber);
};


const valueCheck= valueCountry.length===0 && valueDisaster.length===0 && valueStatus.length===0

      console.log('Disaster:',valueDisaster)
      console.log('CounTry:',valueCountry)
      console.log('Content:',valueStatus)
      console.log('data:',newsDisaster)
      console.log('url',urlFormatSaltwater)
      console.log('geojson',geojsonSaltwater)
      console.log('datasaltwaterongoing:',dataSaltWaterOngoing)
      console.log('datasaltwaterpass:',dataSaltWaterPass)
      console.log('urlDrought',urlDrought)
      console.log('geojsonDrought',geojsonDrought)
      console.log('dataDroughtongoing:',dataDroughtOngoing)
      console.log('dataDroughtpass:',dataDroughtPass)
      console.log('urlTyphoon',urlTyphoon)
      console.log('geojsonTyphoon',geojsonTyphoon)
      console.log('dataTyphoonOngoing:',dataTyphoonOngoing)
      console.log('dataTyphoonpass:',dataTyphoonPass)
      console.log('dataEarthquakeOngoing:',dataEartquakeOngoing)
      console.log('dataEarthquakepass:',dataEarthquakePass)
      console.log('urlFlood',urlFlood)
      console.log('dataFloodOngoing:',dataFloodOngoing)
      console.log('dataFloodpass:',dataFloodPass)
      console.log('dataLandslideOngoing:',dataLandslideOngoing)
      console.log('dataLandslidepass:',dataLandslidePass)
    return (
 
        <div className={style.containerDisasters}>


        <div className={style.main}>  
            <div className={style.main1}></div>
           <div className={style.main2}>
           <div lassName={style.tittleDisasters}> 
           <div>
            
            <h1>Disaster</h1>
           </div>
           <div className={style.border}></div>
            
              </div>
          <div className={style.apiGoogleEarthEngine}>
 <GoogleEarthEngine
  urlFormatSaltwater={urlFormatSaltwater}
  geojsonSaltwater={geojsonSaltwater}
  dataSaltWaterOngoing={dataSaltWaterOngoing}
  dataSaltWaterPass={dataSaltWaterPass}

  urlFormatDrought={urlDrought}
  geojsonDrought={geojsonDrought}
  dataDroughtOngoing={dataDroughtOngoing}
  dataDroughtPass={dataDroughtPass}

  urlFormatTyphoon={urlTyphoon}
  geojsonTyphoon={geojsonTyphoon}
  dataTyphoonOngoing={dataTyphoonOngoing}
  dataTyphoonPass={dataTyphoonPass}

  urlFormatEarthquake={urlEarthquake}
  geojsonEarthquake={geojsonEarthquake}
  dataEarthquakeOngoing={dataEartquakeOngoing}
  dataEarthquakePass={dataEarthquakePass}

  geojsonFlood={geojsonFlood}
  urlFormatFlood={urlFlood}
  dataFloodOngoing={dataFloodOngoing}
  dataFloodPass={dataFloodPass}

  urlFormatLandslide={urlLandslide}
  geojsonLandslide={geojsonLandslide}
  dataLandslideOngoing={dataLandslideOngoing}
  dataLandslidePass={dataLandslidePass}
 /> 
 
              </div> 
        
           <div className={style.product}>
            <div className={style.containerMain1}>
 

            <p style={{ fontWeight: 'bold' }}> Refine the list with filters</p>
          <div className={style.Boder2}></div>

          <nav>
        {
            valueCountry.length!==0 ? (
<ul className={style.ulGetFilterCountryNews} >
    <button className={style.butGetFilterCountryNews}>Country</button>
   { valueCountry.map((item, index) => (
      <li className={style.liGetFilterCountryNews} key={index}>
        <div className={style.getFilterCountryNews}> 
        <p className={style.pGetFilteICountryNews}>Country:</p>
        <p className={style.pGetFilteItemCountryNews}>{item}</p>
        </div>
     <button onClick={()=>handleADeleteValueCountry(index)}> <FontAwesomeIcon icon={faTimes}  /></button>   
        </li>
    ))}
</ul>

            ):(null)
        }

{

valueDisaster.length!==0 ? (
<ul className={style.ulGetFilterDisasterNews} >
    <button className={style.butGetFilterCountryNews}>Disaster</button>
   { valueDisaster.map((item, index) => (
      <li className={style.liGetFilterCountryNews} key={index}>
        <div className={style.getFilterCountryNews}> 
        <p className={style.pGetFilteICountryNews}>Disaster:</p>
        <p className={style.pGetFilteItemCountryNews}>{item}</p>
        </div>
     <button onClick={()=>handleADeleteValueDisaster(index)}> <FontAwesomeIcon icon={faTimes}  /></button>   
        </li>
    ))}
</ul>


):(null)
}
 {
valueStatus.length!==0 ?(
<ul className={style.ulGetFilterContentNews} >
    <button className={style.butGetFilterCountryNews}>Status</button>
   { valueStatus.map((item, index) => (
      <li className={style.liGetFilterCountryNews} key={index}>
        <div className={style.getFilterCountryNews}> 
        <p className={style.pGetFilteICountryNews}>Content:</p>
        <p className={style.pGetFilteItemCountryNews}>{item}</p>
        </div>
     <button onClick={()=>handleADeleteValueContent(index)}> <FontAwesomeIcon icon={faTimes}  /></button>   
        </li>
    ))}
</ul>
):(null)

 }


{

   !valueCheck&&(
<div className={style.allButtonGetFilterNews}> 
        <button onClick={handleAllDelete}>Clear All</button>
        <button onClick={handleFilterNew}  className={style.applyFiltersNews}> Apply Filters</button>
         </div>

    ) 
} 





            <ul className={style.ulFilterNews} >
           <li   className={style.liFilterNews} >

    <button  onClick={activeLink==='country' ?(() => handleShowFilter('')):(() => handleShowFilter('country'))} className={style.buttonFilter}>
    <div className={style.containerFilterNews}>  
    <FontAwesomeIcon className={style.iconFilterNews} icon={faPlus}/> 
    <p className={style.pFilterNews}>Country</p>
   </div>
    </button>
    <div className={ activeLink==='country' ? style.ShowFilter : style.HideFilter}  >
<p>Search for  country</p>

<div style={{ position: 'relative' }}>

<input 
                className={style.inputFilterNews} 
                type='text'  
                value={inputValue}
                onChange={handleInputChange}
                placeholder='Type and Select..'
                />
     <div className={style.suggestions} >
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className={style.suggestionItem}
            style={{ padding: '5px', cursor: 'pointer' }}
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion.provincedetail}
          </div>
        ))}
      </div>


</div>



                <div className={style.buttonAll}>
                <button  onClick={activeLink==='country' ?(() => handleShowFilter('')):(() => handleShowFilter('country'))}  className={style.buttonFilterCancel}>
                Cancel
                 </button> 
                  <button  onClick={ handleShowFilter} className={style.buttonFilterAdd}>
                Add
                 </button>    
                </div>
              

</div>
     </li>

     <li  className={style.liFilterNews} >
    <button  onClick={activeLink==='disaster' ?(() => handleShowFilter('')):(() => handleShowFilter('disaster'))} className={style.buttonFilter}>
    <div className={style.containerFilterNews}>  
    <FontAwesomeIcon className={style.iconFilterNews} icon={faPlus}/> 
    <p className={style.pFilterNews}>Disaster</p>
   </div>
    </button>
    

    <div className={ activeLink==='disaster'  ? style.ShowFilter : style.HideFilter}  >
<p>Search for  country</p>
<select className={style.selectFilterNew} value={selectedValueDisaster} onChange={(e) => {setSelectedValueDisaster(e.target.value);}}>
     <option value="">-Select-</option>
     {disaster.map((disaster,index) => (
      <option className={style.optionSelectFilterNew}  value={disaster.disaster} key={index}>{disaster.disaster}</option>
     ))}
 </select> 

 <div className={style.buttonAll}>
                <button  onClick={activeLink==='disaster' ?(() => handleShowFilter('')):(() => handleShowFilter('disaster'))}  className={style.buttonFilterCancel}>
                Cancel
                 </button> 
                  <button onClick={handleShowFilter} className={style.buttonFilterAdd}>
                Add
                 </button>    
                </div>
</div>
     </li>

     <li   className={style.liFilterNews} >
     <button  onClick={activeLink==='content' ?(() => handleShowFilter('')):(() => handleShowFilter('content'))} className={style.buttonFilter}>
    <div className={style.containerFilterNews}>  
    <FontAwesomeIcon className={style.iconFilterNews} icon={faPlus}/> 
    <p className={style.pFilterNews}>Status</p>
   </div>
    </button>

    <div className={ activeLink==='content'  ? style.ShowFilter : style.HideFilter}  >
<p>Search for  country</p>
<select className={style.selectFilterNew} value={selectedValueStatus} onChange={(e) => {setSelectedValueStatus(e.target.value);}}>
<option value="">-Select-</option>
      <option value="Ongoing">Ongoing</option>
      <option value="Pass">Pass</option>
  
 </select> 

 <div className={style.buttonAll}>
                <button  onClick={activeLink==='content' ?(() => handleShowFilter('')):(() => handleShowFilter('content'))}  className={style.buttonFilterCancel}>
                Cancel
                 </button> 
                  <button onClick={handleShowFilter} className={style.buttonFilterAdd}>
                Add
                 </button>    
                </div>

</div>
     </li>




            </ul>
          </nav>




  
  </div>
            <div className={style.containerMain2}>
            {newsDisaster.map((news, index) => (
    <div className={style.cardDisater}>


    <div className={style.mainCarDisater}> 
    <img className={style.imgHeaderCardDisaster} src={`http://localhost:1513/upload/${news.icon}`}alt="Description for img " />
    <button onClick={()=> navigate( `/pagedisaster?id=${news._id}&name=${news.province}`)} style={{backgroundColor:'white'}} to="/pagedisaster">
    <p  className={style.descHeaderCardDisater}> {news.title}
    </p>
    </button>
    </div>
    
    <div className={style.footerCardDisater}> 
    <ul className= {style.ulFooterCarDisaster}>
    <li className= {style.liFooterDisaster} >
     { status === `${news.status}` ? (<p className={style.statusOngoinCarDisaster}></p>):(<p className={style.statusAlertCardNews}></p>)}
      <p className={style.statusCardNews}> {news.status} </p>
      </li>
    
        <li className= {style.liFooterDisaster}>
        <p className={style.typeDisasterCardNews}>Disaster:</p>
        <p>{news.disaster}</p>
        </li>
        <li className= {style.liFooterDisaster1}>
        <p >Affected :</p>
      
        <p  className={style.affectedprovince}>{news.province.split(',').length <4 ? news.province :news.region}</p>
        </li>
    
    
    
    </ul>
    </div>
    
        </div>

            ))}
        

    <div>
  {Array.from({ length: !filter ? (totalPages ):(totalPagesFilter) }, (_, index) => (
          <button
            key={index + 1}
            onClick={!filter ? (() => handlePageChange(index + 1)):(() =>handleFilterNew(index + 1)) }
            disabled={ !filter?(currentPage === index + 1):(currentPageFilter === index + 1)} 
          >
            {index + 1}
          </button>
        ))}
           

  </div>



            </div>
            
           </div>
  
           </div>
  <div className={style.main3}></div>
  
        </div>
    
      
        </div>
    )
}

export default Disasters
