import React, { useEffect, useState } from 'react'
import {Link,  Element } from 'react-scroll';
import style from "./pagecountry.module.css"
import img from '../../assets/img/sieu-bao-yagi-anh-huong-den-khu-vuc-nam-bo.jpg'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
const PageCountry = () => {
    const [activeSection, setActiveSection] = useState('disaster');
    const [status,setStatus] =useState('Ongoing')
    const [searchParams]=useSearchParams()   
    const name = searchParams.get('name');
  
    const [newsrelated,setRelatedNews]=useState([]);
    const [newsrelateddisaster,setRelatedNewsDisaster]=useState([]);
    const navigate=useNavigate()
    useEffect(() => {
   
      axios.get( `http://localhost:1513/todos/getapinamenew?name=${encodeURIComponent(name)}`)
      .then(New =>setRelatedNews(New.data))
      .catch(err=>console.log(err))
      axios.get( `http://localhost:1513/todos/getapinamenewdisaster?name=${encodeURIComponent(name)}`)
      .then(New =>setRelatedNewsDisaster(New.data))
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
    }, []);

    console.log(activeSection)




  return (
    <div className={style.containerAbout}>
    <div className={style.main}>  
    <div className={style.main1}></div>
       <div className={style.main2}>
       <div lassName={style.tittleAbout}> 
    
       <h2 className={style.h2Header}>{name}</h2>

       <div className={style.border}></div>
        
          </div>
       <div className={style.product}>
       <div className={style.containerMain1}>
       
       <nav>
       
       <ul className={style.cateUlAbout} >
   
               <li className={style.cateLiAbout}>
               <div className={activeSection=== 'news' ? style.active : ''}   ></div> 
               <Link activeClass="active" to="news" spy smooth>
        NEWS
               </Link>
               </li>
               <li className={style.cateLiAbout}>

               <div className={activeSection === 'disaster' ? style.active : ''}   ></div> 
               <Link activeClass="active" to="disaster" spy smooth>
       DISASTER
               </Link>
               </li>
 
           </ul>
           
       </nav>
           </div>





        <div className={style.containerMain2}>
        <Element id="news" className="element">
            <div className={style.titleCate}> 
            <div className={activeSection=== 'news' ? style.activeTitleCate : ''}   ></div> 
                <h2> News
                    </h2> 
                 </div>
                 {newsrelated.map((newsrelated, index) => (
   <div className={style.cardNews}>
             
   <div className={style.headerCardNews}> 
   
      <h3 className={style.titleCardNews}>
      <button style={{backgroundColor:'white'}} onClick={()=> navigate( `/pagenews?id=${newsrelated._id}&name=${newsrelated.province}`)} >  {newsrelated.title}</button>
      </h3>
   </div>
   
   <div className={style.footerCardNews}> 
   <ul className= {style.ulFooterCardNews}>
       <li className= {style.liFooterCardNews}>
       <p className={style.typeDisasterCardNews}>Disaster:</p>
       <p>Typhoon</p>
       </li>
   
       <li className= {style.liFooterCardNews}>
       <p className={style.postedCardNews}>Posted:</p>
       <p>10 Oct 2024</p>
       </li>
 
   
   
   </ul>
   </div>
   
       </div>

                 ))}

              
               

  </Element>

  <Element id="disaster" className="element">
  <div className={style.titleCate}> 
  <div className={activeSection=== 'disaster' ? style.activeTitleCate : ''}   ></div> 
  <h2>Disaster</h2> 
                 </div>

                 {newsrelateddisaster.map((newsrelated, index) => (


<div className={style.cardDisater}>


<div className={style.mainCarDisater}> 
<img className={style.imgHeaderCardDisaster} src={`http://localhost:1513/upload/${newsrelated.icon}`}alt="Description for img " />
<button onClick={()=> navigate( `/pagedisaster?id=${newsrelated._id}&name=${newsrelated.province}`)} style={{backgroundColor:'white'}} to="/pagedisaster">
    <p  className={style.descHeaderCardDisater}> {newsrelated.title}
    </p>
    </button>

</div>

<div className={style.footerCardDisater}> 
<ul className= {style.ulFooterCarDisaster}>
<li className= {style.liFooterDisaster} >
 { status===`${newsrelated.status}` ? (<p className={style.statusOngoinCarDisaster}></p>):(<p className={style.statusAlertCardNews}></p>)}
  
  <p className={style.statusCardNews}> {newsrelated.status}</p>
  </li>

    <li className= {style.liFooterDisaster}>
    <p className={style.typeDisasterCardNews}>Disaster:</p>
    <p>{newsrelated.disaster}</p>
    </li>
  
    <li className= {style.liFooterDisaster}>
    <p className={style.postedCardNews}>Affected country</p>
    <p  className={style.affectedprovince}>{newsrelated.province.split(',').length <4 ? newsrelated.province :newsrelated.region}</p>
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

export default PageCountry
