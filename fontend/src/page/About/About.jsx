import React, { useEffect, useState } from 'react'
import {Link,  Element, animateScroll as scroll } from 'react-scroll';
import style from './about.module.css'

const About= () => {
    const [activeSection, setActiveSection] = useState('WorldRiskReport');

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
           <div>
            
            <h1>About</h1>
           </div>
           <div className={style.border}></div>
            
              </div>
           <div className={style.product}>
            <div className={style.containerMain1}>
            <Element id="WorldRiskReport" className="element">
                <div className={style.titleCate}> 
                <div className={activeSection=== 'WorldRiskReport' ? style.activeTitleCate : ''}   ></div> 
                    <h2> World Risk Report  
                        </h2> 
                     </div>
            
            <p> The WorldRiskReport is an annual technical report on global disaster risks. The yearly issues of the WorldRiskReport focus on varying critical topics related to disaster risk management and are published in German and English. The report includes the WorldRiskIndex, which identifies the risk of an extreme natural event becoming a disaster for 181 countries worldwide.[1] </p>

             <p>The report has been published annually by Byter Entwicklung Hilft since 2011 – until 2016 in cooperation with the Institute for Environment and Human Security (UNU-EHS) at the United Nations University in Bonn.[2] Since 2018, the WorldRiskReport has been published jointly with the Institute for International Law of Peace and Armed Conflict (IFHV) at the Ruhr University Bochum.[3]</p>

           <p>The report aims to highlight linkages between extreme natural events, climate change, disaster risk reduction, and social inequality at the global level to provide a realistic picture of disasters and risk.[1] Through the close exchange between science and development policy practice, approaches to solutions and recommendations for action for current challenges in disaster risk reduction, climate change adaptation, and development policy are identified.[4][5]   </p>


      </Element>
      <Element id="GoogleEarthEngine" className="element">
      <div className={style.titleCate}> 
      <div className={activeSection === 'GoogleEarthEngine' ? style.activeTitleCate : ''}   ></div> 
      <h2>Google Earth Engine </h2> 
                     </div>
   
      <p>Earth Engine is a platform for scientific analysis and visualization of geospatial datasets, for academic, non-profit, business and government users. </p>
       <p>Earth Engine hosts satellite imagery and stores it in a public data archive that includes historical earth images going back more than forty years. The images, ingested on a daily basis, are then made available for global-scale data mining. </p>
      <p> Earth Engine also provides APIs and other tools to enable the analysis of large datasets.</p>

      </Element>


 </div>
            <div className={style.containerMain2}>
           
        <nav>
        <h2>Overview</h2>
            <ul className={style.cateUlAbout} >
                <li className={style.cateLiAbout}>
                <div className={activeSection=== 'WorldRiskReport' ? style.active : ''}   ></div> 
                <Link activeClass="active" to="WorldRiskReport" spy smooth>
                World Risk Report
                </Link>
                </li>
                <li className={style.cateLiAbout}>

                <div className={activeSection === 'GoogleEarthEngine' ? style.active : ''}   ></div> 
                <Link activeClass="active" to="GoogleEarthEngine" spy smooth>
                Google Earth Engine
                </Link>
                </li>


            </ul>
        </nav>
            </div>
            
           </div>

           </div>


        </div>
       
      
        </div>
    )
}

export default About
