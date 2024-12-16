import React, { useEffect } from 'react'
import style from './news.module.css'
import {  useState } from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faTimes } from '@fortawesome/free-solid-svg-icons'; 

import axios from 'axios';
import CardNew from '../../components/cardnew/CardNew';
import { data } from 'autoprefixer';
library.add(faPlus); 



const News= () => {

    const [valueDisaster,setValueDisaster] = useState([])
    const [valueCountry,setValueCountry] = useState([])
    const [search,setsearch]=useState('');
    const [activeLink, setActiveLink] = useState('');
    const [selectedValueDisaster, setSelectedValueDisaster] = useState('');
    var [news,setNews]=useState([]);
    // const [filterCountry,setFilterCountry]=useState(['China','Việt Nam']);
    // const [filterTypeDisaster,setFilterTypeDisaster]=useState(['Typhoon']);
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

  useEffect(()=>{
    console.log('current Page Api New',currentPage)
    axios.get("http://localhost:1513/todos/getapinew",{
    params: {
      limit:itemsPerPage,
      currentpage:currentPage,
    }
  })

.then(New =>{setNews(New.data.data)
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


  },[currentPage,totalPages])


   
  

  
    const fetchItems = async (pageNumber) => {
      try {
      console.log('currentPage',currentPage)
        const response = await axios.get('http://localhost:1513/todos/getapifilternew', {
          params: {
            disaster: valueDisaster.join(','), 
            country: valueCountry.join(',') ,
            limit:itemsPerPage,
            currentpage:pageNumber,
          }
        });
        setNews(response.data.data);  
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
        setActiveLink(link)
        handleSetValue()
        setInputValue('')
        setSelectedValueDisaster('')
      };



      const handleADeleteValueCountry = (index) => {
        const valueCountryNew= [...valueCountry.slice(0, index), ...valueCountry.slice(index + 1)];
        setValueCountry(valueCountryNew);
      };
  
      const handleADeleteValueDisaster = (index) => {
        const valueDisasterNew= [...valueDisaster.slice(0, index), ...valueDisaster.slice(index + 1)];
        setValueDisaster(valueDisasterNew);
      };
const handleAllDelete=()=>{

    setValueCountry([])
    setValueDisaster([])
}
 const handlePageChange = (pageNumber) => {
   console.log('hàm handlePageChange được gọi')
  setCurrentPage(pageNumber);
 };
const handleFilterNew=(pageNumber)=>{
 
  setFilter(true)
  console.log('hàm handleFilterNew được gọi')
  fetchItems(pageNumber)
}
const  valueCheck = valueCountry.length === 0 && valueCountry.length === 0

console.log(localNew)
      // console.log('Disaster:',valueDisaster)
      // console.log('CounTry:',valueCountry)
      console.log('NEWS',news)
      console.log('suggestions',suggestions)
      console.log('totalPages',totalPages)

      // console.log(disaster)
    return (
        <div className={style.containerNew}>
        <div className={style.main}>  
        <div className={style.main1}></div>
           <div className={style.main2}>
           <div lassName={style.tittleNew}> 
          
            
            <h1 className={style.title}>All New</h1>
            <div className={style.Boder1}></div>
     
            
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
   !valueCheck && (
      <div className={style.allButtonGetFilterNews}> 
              <button onClick={handleAllDelete}>Clear All</button>
              <button onClick={handleFilterNew}  className={style.applyFiltersNews}> Apply Filters</button> *
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
     <option className={style.optionSelectFilterNew}  value="">-Select-</option>
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





            </ul>
          </nav>
  </div>
    <div className={style.containerMain2}>
      {
        news.map((news) => 
     
          <CardNew
          province={news.province}
          title={news.title}
          description={news.description}
          disaster={news.disaster}
          post={news.datepost}
          id={news._id}
          img={news.img}
          />  

        )
      }
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
  
  
        </div>
       
      
        </div>
    )
}

export default News
