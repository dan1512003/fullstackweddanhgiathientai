import React from 'react'
import style from './cardnew.module.css'
import img from '../../assets/img/sieu-bao-yagi-anh-huong-den-khu-vuc-nam-bo.jpg'
import { Link, NavLink, useNavigate } from "react-router-dom";

const CardNew = (props) => {
    
   const navigate = useNavigate()
    return (
        
        <div className={style.cardNews}>
<div className={style.headerCardNews}> 

   <h3 className={style.titleCardNews}>
   <button onClick={()=> navigate( `/pagenews?id=${props.id}&name=${props.province}`)}>{props.title}</button>
 
   </h3>
   
</div>

<div className={style.mainCardNews}> 
<img className={style.imgHeaderCardNews} src={`http://localhost:1513/upload/${props.img}`}alt="Description for img " />
<p  className={style.descHeaderCardNews}> 
    {props.description}
</p>
</div>

<div className={style.footerCardNews}> 
<ul className= {style.ulFooterCardNews}>
    <li className= {style.liFooterCardNews}>
    <p className={style.typeDisasterCardNews}>Disaster:</p>
    <p>{props.disaster}</p>
    </li>

    <li className= {style.liFooterCardNews}>
    <p className={style.postedCardNews}>Posted:</p>
    <p>{props.post}</p>
    </li>
    <li className= {style.liFooterDisaster1}>
        <p >Affected :</p>
      
        <p  className={style.affectedprovince}>{props.province}</p>
        </li>


</ul>
</div>

    </div>
    )
}

export default CardNew
