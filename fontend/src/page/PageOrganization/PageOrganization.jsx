import React, { useEffect, useState } from 'react'
import {Link,  Element } from 'react-scroll';


import style from './pageorganization.module.css'
const PageOrganization = () => {

    const [activeSection, setActiveSection] = useState('disaster');

    useEffect(() => {
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
        
           <h2 className={style.h2Header}>Typhoon Yagi</h2>
  
           <div className={style.border}></div>
            
              </div>
           <div className={style.product}>
           <div className={style.containerMain1}>
           
           <nav>
           
           <ul className={style.cateUlAbout} >
           <h2>Overview</h2>
                   <li className={style.cateLiAbout}>
                   <div className={activeSection=== 'description' ? style.active : ''}   ></div> 
                   <Link activeClass="active" to="description" spy smooth>
                Description
                   </Link>
                   </li>
                   <li className={style.cateLiAbout}>
   
                   <div className={activeSection === 'detail' ? style.active : ''}   ></div> 
                   <Link activeClass="active" to="detail" spy smooth>
                 Detail
                   </Link>
                   </li>
                
                   <li className={style.cateLiAbout}>
   
   <div className={activeSection === 'socialmedia' ? style.active : ''}   ></div> 
   <Link activeClass="active" to="socialmedia" spy smooth>
  Social Media

   </Link>


   </li>
               </ul>
               
           </nav>
               </div>





            <div className={style.containerMain2}>
            <Element id="description" className="element">
                <div className={style.titleCate}> 
                <div className={activeSection=== 'description' ? style.activeTitleCate : ''}   ></div> 
                    <h2> Description 
                        </h2> 
                     </div>
            
                     <p> The WorldRiskReport is an annual technical report on global disaster risks. The yearly issues of the WorldRiskReport focus on varying critical topics related to disaster risk management and are published in German and English. The report includes the WorldRiskIndex, which identifies the risk of an extreme natural event becoming a disaster for 181 countries worldwide.[1] </p>

<p>The report has been published annually by Byter Entwicklung Hilft since 2011 – until 2016 in cooperation with the Institute for Environment and Human Security (UNU-EHS) at the United Nations University in Bonn.[2] Since 2018, the WorldRiskReport has been published jointly with the Institute for International Law of Peace and Armed Conflict (IFHV) at the Ruhr University Bochum.[3]</p>

<p>The report aims to highlight linkages between extreme natural events, climate change, disaster risk reduction, and social inequality at the global level to provide a realistic picture of disasters and risk.[1] Through the close exchange between science and development policy practice, approaches to solutions and recommendations for action for current challenges in disaster risk reduction, climate change adaptation, and development policy are identified.[4][5]   </p>


      </Element>

      <Element id="detail" className="element">
      <div className={style.titleCate}> 
      <div className={activeSection=== 'detail' ? style.activeTitleCate : ''}   ></div> 
      <h2>Detail</h2> 
                     </div>
   
      <ul className={style.ulDetail}>
<li className={style.liDetail}><p>Organization type:</p><p>Non-governmental Organization</p></li>
<li className={style.liDetail} ><p>Headquarters:</p><p>Lebanon</p></li>
<li className={style.liDetail} ><p>Homepage:</p><a href='https://www.abaadmena.org/'>https://www.abaadmena.org/</a></li>
      </ul>
      </Element>

      <Element id="socialmedia" className="element">
      <div className={style.titleCate}> 
      <div className={activeSection=== 'socialmedia' ? style.activeTitleCate : ''}   ></div> 

      <h2>
      Social Media
      </h2> 
                     </div>
   
         
<div className={style.Social}>
<ul className={style.ulSocial}>
  <li className={style.liSocial}>
<a href="https://www.facebook.com/abaadmena">Facebook</a>

  </li>
  <li className={style.liSocial}>
   <a href="https://www.linkedin.com/authwall?trk=bf&trkInfo=AQHWBDT_SbR8vQAAAZKRFRFQoM7DpEnupr8in6uHjmCjXkNZ7cfHoRUIHu1RyL_K8nYPuzeXgQBTlp96tSL1jtUATV">LinkedIn</a>
  </li>
  <li className={style.liSocial}>
   <a href="https://www.youtube.com/user/ABAADMENA" >Youtube</a>
  </li>
  <li className={style.liSocial}>
   <a href="https://www.instagram.com/abaadmena/">Instagram</a> 
  </li>
  <li className={style.liSocial}>
    <a href="https://x.com/">X</a>
  </li>
</ul>


  </div>

          



      </Element>

 </div>
         
            
           </div>

           </div>


        </div>
       
      
        </div>
        )
}

export default PageOrganization
