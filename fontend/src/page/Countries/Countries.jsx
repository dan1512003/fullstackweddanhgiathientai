import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import style from './countries.module.css'
import { Element, Link } from 'react-scroll';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

// import { Link, NavLink } from 'react-router-dom'
const Countries = () => {
  const navigate = useNavigate()
  const [province,setProvince] =useState([])
useEffect(()=>{
axios.get("http://localhost:1513/todos/getapicountry")
.then(province =>setProvince(province.data))
.catch(err=>console.log(err))

},[])

  const [activeAlphaBet, setActiveAlphaBet] = useState('');

    const alphabet =['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','Z']
    const handleClick = (e) => {
        setActiveAlphaBet(e);
      };

const Text='Viet Nam'
console.log(activeAlphaBet)
const isFirstCharUpperCase = (str,value) => {
  if (!str || str.length === 0) return false; // Kiểm tra chuỗi rỗng
  return str[0].toUpperCase() === value; // So sánh ký tự đầu tiên
};
    return (
        <div>
        <div className={style.containerContact}>
      <div className={style.main}>  
      <div className={style.main1}></div>
         <div className={style.main2}>
         <div lassName={style.tittleContact}> 
         <div>
          
          <h1>All Countries</h1>
         </div>
         <div className={style.border}></div>
          
            </div>
         <div className={style.product}>
          <div className={style.containerMain1}>
            <ul className={style.ulSelectAlphaBet}>
            {alphabet.map((value, index) => (
                 <Link to={value} onClick={()=>handleClick(value)}> <li className={style.liSelectAlphaBet} key={index}>
          {value}
          </li> </Link>
        ))}
    
            </ul>

</div>
          <div className={style.containerMain2}>
      
          {alphabet.map((value, index) => (
 <Element id={value}  key={index} className={activeAlphaBet === value? style.activeElement  : ''}>
<p className={style.pValueAlphabet}>{value}</p>
<div  className={style.provincealpha}>
{province.map((province,index)=>(


isFirstCharUpperCase(province.provincedetail,value) ? (<p style={{backgroundColor:'aliceblue'}} onClick={()=> navigate( `/pagecountry?name=${province.province}`)}><p className={style.Countries}>{province.provincedetail}</p></p>):(null)
)

)}


</div>



 </Element>
          ))}
          </div>
          
         </div>

         </div>
 <div className={style.main3}></div>

      </div>
     
    
      </div>
        </div>
    )
}

export default Countries
