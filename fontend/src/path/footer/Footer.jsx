import React from 'react'
import style from './footer.module.css'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram ,faTelegram, faLinkedinIn} from '@fortawesome/free-brands-svg-icons';
const Footer = () => {
    return (
        <div className={style.containerBottom}>
         <nav className={style.navbarBottom}>
<ul className={style.ulBottom}>
<li className={style.liBottom}>
   
    <NavLink className={style.cateBottom} to="/about" >ABOUT US</NavLink>
</li>
<li className={style.liBottom}>
    <NavLink className={style.cateBottom} to="/contact">CONTACT</NavLink>
</li> 
</ul>
<div className={style.Social}>
<a className={style.linkSocial} href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon className={style.iconSocial} icon={faFacebookF} />
</a>
<a className={style.linkSocial}  href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon className={style.iconSocial} icon={faTwitter} />
</a>
<a className={style.linkSocial}  href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon className={style.iconSocial} icon={faInstagram} />
</a>
<a className={style.linkSocial}  href="https://t.me/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon  className={style.iconSocial} icon={faTelegram} />
</a>
<a className={style.linkSocial}  href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon className={style.iconSocial}  icon={faLinkedinIn} />
</a>
</div>
         </nav>
         <div className={style.rightReserved}>   
         <div >
       <p>Service provided by</p>
       <div className={style.infoGee}>
       <h1 className={style.logo}>GEE</h1>
       <p className={style.description}>is an incredibly powerful cloud-based geographic data processing platform that is widely used in Earth research.</p>
       </div>
         </div>
         <div>
          <h1>WRR NEM</h1>
          <p>© 2024 all rights reserved.</p>
         </div>
         </div>
     
        </div>
    )
}

export default Footer
