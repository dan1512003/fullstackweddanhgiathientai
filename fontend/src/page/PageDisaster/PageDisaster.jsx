
import React, { useEffect, useState } from 'react'
import {Link,  Element, animateScroll as scroll } from 'react-scroll';
import style from './pagedisaster.module.css'
import img from '../../assets/img/sieu-bao-yagi-anh-huong-den-khu-vuc-nam-bo.jpg'
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
const PageDisaster = () => {
    const [activeSection, setActiveSection] = useState('disaster');
    const [status,setStatus] =useState('Ongoing')


    


    const [news,setNews]=useState([]);
    const [newsrelated,setRelatedNews]=useState([]);
    const [searchParams]=useSearchParams()       
  
    const navigate=useNavigate()
    const id = searchParams.get('id');
    
    const name = searchParams.get('name');
    console.log(name)
    useEffect(() => {
      axios.get( `http://localhost:1513/todos/getapiidnewdisaster/${id}`)
      .then(New =>setNews(New.data))
      .catch(err=>console.log(err))
      axios.get( `http://localhost:1513/todos/getapinamenew?name=${encodeURIComponent(name)}&id=${encodeURIComponent(id)}`)
      .then(New =>setRelatedNews(New.data))
      .catch(err=>console.log(err))


      const handleScroll = () => {
        const elements = document.querySelectorAll('.element');
         elements.forEach((element) => {
          if (element.getBoundingClientRect().top <= window.innerHeight / 2) {
            setActiveSection(element.id);
          
          }
        });
      };
     
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
     
 
    },[id,name]);
  
  
  console.log(news)
  console.log(newsrelated)
    console.log(activeSection)




    return (
        <div className={style.containerAbout}>
        <div className={style.main}>  
        <div className={style.main1}></div>
           <div className={style.main2}>
           <div lassName={style.tittleAbout}> 
           <div className={style.header}>
           <img className={style.imgHeaderCardNews} src={`http://localhost:1513/upload/${news.icon}`}alt="Description for img " />
           <div className={style.statusandTitle}>
           <h2 className={style.h2Header}>{news.title}</h2>
           <ul className= {style.ulHeader}>
<li className= {style.liHeader} >
 { status===`${news.status}` ? (<p className={style.statusOngoingHeader}></p>):(<p className={style.statusAlertHeader}></p>)}
  
  <p className={style.statusHeader}> {news.status} </p>
  </li>
</ul>

           </div>
           
           </div>
           <div className={style.border}></div>
            
              </div>
           <div className={style.product}>
           <div className={style.containerMain1}>
           
           <nav>
           
           <ul className={style.cateUlAbout} >
           <h2>Overview</h2>
                   <li className={style.cateLiAbout}>
                   <div className={activeSection=== 'disaster' ? style.active : ''}   ></div> 
                   <Link activeClass="active" to="disaster" spy smooth>
                   Disaster description
                   </Link>
                   </li>
                   <li className={style.cateLiAbout}>
   
                   <div className={activeSection === 'country' ? style.active : ''}   ></div> 
                   <Link activeClass="active" to="country" spy smooth>
                   Affected Countries
                   </Link>
                   </li>
                   <h2>Lates</h2>
                   <li className={style.cateLiAbout}>
   
   <div className={activeSection === 'lastet' ? style.active : ''}   ></div> 
   <Link activeClass="active" to="lastet" spy smooth>
  Lastest Update
   </Link>
   </li>
               </ul>
               
           </nav>
               </div>





            <div className={style.containerMain2}>
            <Element id="disaster" className="element">
                <div className={style.titleCate}> 
                <div className={activeSection=== 'disaster' ? style.activeTitleCate : ''}   ></div> 
                    <h2> Disaster description 
                        </h2> 
                     </div>
            <div dangerouslySetInnerHTML={{ __html: news.description }} ></div>
            

      </Element>

      <Element id="country" className="element">
      <div className={style.titleCate}> 
      <div className={activeSection=== 'country' ? style.activeTitleCate : ''}   ></div> 
      <h2>Affected Countries</h2> 
                     </div>
   
    {news.province}
      </Element>

      <Element id="lastet" className="element">
      <div className={style.titleCate}> 
      <div className={activeSection=== 'lastet' ? style.activeTitleCate : ''}   ></div> 

      <h2>
        Latest Updates
      </h2> 
                     </div>
                     {newsrelated.map((newsrelated, index) => (

<div className={style.cardNews}>
             
<div className={style.headerCardNews}> 

 <p className={style.countryCardNews}>{newsrelated.province}</p>
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
    <p className={style.postedCardNews}>Start date:</p>
    <p>{newsrelated.startdate}</p>
    </li>
    <li className= {style.liFooterCardNews}>
    <p className={style.postedCardNews}>End date:</p>
    <p>{newsrelated.enddate}</p>
    </li>


</ul>
</div>

    </div>
                     ))}
            



              



      </Element>

 </div>
         
            
           </div>

           </div>


        </div>
       
      
        </div>
    )
}

export default PageDisaster
