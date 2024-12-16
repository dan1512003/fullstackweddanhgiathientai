import React from 'react'
import style from './contact.module.css'
import { NavLink } from 'react-router-dom'

const Contact = () => {
    return (
      <div className={style.containerContact}>
      <div className={style.main}>  
      <div className={style.main1}></div>
         <div className={style.main2}>
         <div lassName={style.tittleContact}> 
         <div>
          
          <h1>Contact</h1>
         </div>
         <div className={style.border}></div>
          
            </div>
         <div className={style.product}>
          <div className={style.containerMain1}>
          <p>Need to get in touch with us?</p>
          <p>Write to us for inquiries or feedback related to:</p>
   <ul>
    <li>
  Gmail:nnguyengg123@gmail.com
    </li>
    <li>
  Telephone:0337729501
    </li>
  
   </ul>
<p>Please do not spam gmail. </p>

</div>
          <div className={style.containerMain2}>
         
      <nav>
      <h2>More about WRR</h2>
          <ul className={style.cateUlAbout} >
              <li className={style.cateLiAbout}>
             
            
            <NavLink className={style.liContact} to="/about"  >About Us</NavLink>
              </li>
               <li className={style.cateLiAbout}>

             

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

export default Contact
