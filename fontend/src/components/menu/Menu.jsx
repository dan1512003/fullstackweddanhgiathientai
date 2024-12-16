
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import style from './menu.module.css'
import { NavLink } from 'react-router-dom'
import { useState } from 'react';
const Menu = ({handleShowSearch}) => {
    const [activeLink, setActiveLink] = useState('');

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };
  return(
<div>
<nav   className={style.navbarMenu} >   
<div>  
  <h2 className={style.logo}>WRR NEW</h2> 
</div>
<ul className={style.ulMenu}>
<button onClick={handleShowSearch} className={style.buttonSearch} >
<FontAwesomeIcon 
className={style.iconOnClickSearch}  
icon={faSearch} />
search</button>

<li className={style.liMenu}  onClick={() => handleLinkClick('disaster')}>
    <NavLink  to="/disasters" className={style.navLinkMenu}  >DISASTERS</NavLink>
    <div className={activeLink === 'disaster' ? style.active : ''}   ></div> 
</li>
<li className={style.liMenu}    onClick={() => handleLinkClick('news')}>
    <NavLink className={style.navLinkMenu} to="/news" >NEWS</NavLink>
    <div className={activeLink === 'news' ? style.active  : ''}   ></div> 
</li>
<li className={style.liMenu}   onClick={() => handleLinkClick('countries')}>
    <NavLink className={style.navLinkMenu} to="/countries">COUNTRIES</NavLink>
    <div className={activeLink === 'countries' ? style.active : ''}   ></div> 
</li>
{/* <li  className={style.liMenu}  onClick={() => handleLinkClick('analysis')}>
    <NavLink className={style.navLinkMenu} to="/analysis">ANALYSIS</NavLink>
     <div className={activeLink === 'analysis' ? style.active  : ''}   ></div> 
 </li > */}

 </ul>
       </nav>
       <div className={style.bar} >
   

       </div>
</div>







    )
}

export default Menu
