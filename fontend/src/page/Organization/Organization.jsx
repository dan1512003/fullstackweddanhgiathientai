import React from 'react'
import style from './organization.module.css'

import { Link, NavLink } from 'react-router-dom'
const Organization = () => {
  const alphabet =['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','Z']
    return (
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
            {
  alphabet.map((letter, index) => {
    return <li  className={style.liSelectAlphaBet}     key={index}>{letter}</li>;
  })
}

            </ul>

</div>
          <div className={style.containerMain2}>
     
          <div  className={style.cardOrganization}>
  <Link to="/pageorganization"><p className={style.nameOrganization}> ABAAD – Resource Center for Gender Equality </p></Link>

     </div>

     <div  className={style.cardOrganization}>
     <Link to="/pageorganization"><p className={style.nameOrganization}> ABAAD – Resource Center for Gender Equality </p></Link>

     </div>

     <div  className={style.cardOrganization}>
  <Link to="/pageorganization"><p className={style.nameOrganization}> ABAAD – Resource Center for Gender Equality </p></Link>

     </div>

     <div  className={style.cardOrganization}>
     <Link to="/pageorganization"><p className={style.nameOrganization}> ABAAD – Resource Center for Gender Equality </p></Link>

     </div>

          </div>
          
         </div>

         </div>
 <div className={style.main3}></div>

      </div>
     
    
      </div>
    )
}

export default Organization
