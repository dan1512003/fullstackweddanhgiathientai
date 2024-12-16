import React, { useEffect, useState} from 'react'
import style from './pagenews.module.css'
import img from '../../assets/img/sieu-bao-yagi-anh-huong-den-khu-vuc-nam-bo.jpg'
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios"
const PageNews = () => {
 
  const [news,setNews]=useState([]);
  const [newsrelated,setRelatedNews]=useState([]);
  const [searchParams]=useSearchParams()       

  const navigate=useNavigate()
  const id = searchParams.get('id');
  
  const name = searchParams.get('name');
  console.log(name)
    useEffect(()=>{
      axios.get( `http://localhost:1513/todos/getapiidnew/${id}`)
      .then(New =>setNews(New.data))
      .catch(err=>console.log(err))
      axios.get( `http://localhost:1513/todos/getapinamenew?name=${encodeURIComponent(name)}&id=${encodeURIComponent(id)}`)
      .then(New =>setRelatedNews(New.data))
      .catch(err=>console.log(err))
        },[id,name])



console.log(news)
console.log(newsrelated)
    return (
        <div className={style.containerPageNews}>
        <div className={style.main}>  
        <div className={style.main1}></div>
           <div className={style.main2}>
           <div lassName={style.tittlePageNews}> 
           <div>
            
            <h1>{news.title}</h1>
           </div>
           <div className={style.border}></div>
            {/* div dangerouslySetInnerHTML={{ __html: news.content }}*/}
              </div>
           <div className={style.product}>
            <div className={style.containerMain1} dangerouslySetInnerHTML={{ __html: news.content }} >
          
  </div>
            <div className={style.containerMain2}>
           
        <nav>



            <ul className={style.cateUlPageNews} >
 
             <li className={style.cateLiPageNews}>
               
               <p className={style.catePPageNews}>Country:</p>
               <p>{news.province}</p>
 
                 </li>
                  <li className={style.cateLiPageNews}>
   
                  <p className={style.catePPageNews} >Disaster:</p>
                  <p>{news.disaster}</p>
   
                 </li> 
                 <li className={style.cateLiPageNews}>
                
                <p className={style.catePPageNews} >Posted:</p>
                <p>{news.datepost}</p>
             
                  </li>
               
            </ul>
        </nav>
            </div>
            
           </div>
  
           </div>
  <div className={style.main3}></div>
  
        </div>
       <div className={style.sub} >
      <div className={style.sub1}></div>
            
<div className={style.sub2} >
<div lassName={style.tittlePageNews2}> 
           <div>
            
            <h1>Related Content</h1>
           </div>
           <div className={style.border2}>
        
           </div>
            
              </div>
              <div className={style.product2}>


              {newsrelated.map((newsrelated, index) => (
               <div className={style.cardNews}>
             
               <div className={style.headerCardNews}> 
                  <h3 className={style.titleCardNews}>
                   <button onClick={()=> navigate( `/pagenews?id=${newsrelated._id}&name=${newsrelated.province}`)} >  {newsrelated.title}</button>
                  </h3>
               </div>
               
               <div className={style.footerCardNews}> 
               <ul className= {style.ulFooterCardNews}>
                   <li className= {style.liFooterCardNews}>
                   <p className={style.typeDisasterCardNews}>Disaster:</p>
                   <p>{newsrelated.disaster}</p>
                   </li>
               
                   <li className= {style.liFooterCardNews}>
                   <p className={style.postedCardNews}>Posted:</p>
                   <p>{newsrelated.datepost}</p>
                   </li>
                  
               </ul>
               </div>
               
                   </div>
               
        ))}

 
    

            

                </div>

</div>
<div className={style.sub3}></div>
       </div>
      
        </div>
    )
}

export default PageNews
