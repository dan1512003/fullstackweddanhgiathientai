import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faCaretDown,faCaretUp  } from '@fortawesome/free-solid-svg-icons';
import style from './header.module.css'
import Menu from '../../components/menu/Menu'
import { useState } from 'react';

import {  NavLink, useNavigate } from 'react-router-dom';
const Header = () => {
    const [search,setsearch]=useState();
    const [isShowSearch, setIShowSearch] = useState(false);
    const [isShowCate, setIShowCate] = useState(false);
    const [activeLink, setActiveLink] = useState('disaster');
const navigate =useNavigate();
    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    const handleShowSearch= () => {
        setIShowSearch(!isShowSearch);
        setIShowCate(false);
      };
      const handleShowCate= () => {
        setIShowCate(!isShowCate);
        setIShowSearch(false);
        };
    const handleSubmit=(e)=>{
       e.preventDefault();
       navigate( `/pagesearch/${search}`)
    }
    
    return (
        <div className={style.containerHeader}>

            <div className={style.mid}>
            <Menu handleShowSearch={handleShowSearch} />
            </div>
       <div className={style.mid2}>
            <nav   className={style.navbarMenu} >   
        <div >  
  <h2 className={style.logo}>WRR NEW</h2> 
</div>
<ul className={style.ulMenu}>
<button onClick={handleShowSearch} className={style.buttonSearch} >
<FontAwesomeIcon 
className={style.iconOnClickSearch}  
icon={faSearch} />
</button>
<buton className={style.butonMenu} onClick={handleShowCate}> Menu 
{
 isShowCate ?(
 <FontAwesomeIcon icon= {faCaretDown} />  ): (
 <FontAwesomeIcon className={style.iconfaCareUp} icon={faCaretUp} />)
}

</buton>

<div className={style.cateMenu}>
{
isShowCate ? (
<ul className={style.ulChildMenu}>
<li className={style.liMenu}   onClick={() => handleLinkClick('disaster')}>
     <div className={activeLink === 'disaster' ? style.active : ''}   ></div> 
    <NavLink className={style.navLinkMenu} to="/disasters" >DISASTERS</NavLink>
</li>
<li className={style.liMenu}   onClick={() => handleLinkClick('news')}>
    <div className={activeLink === 'news' ? style.active  : ''}   ></div> 
    <NavLink className={style.navLinkMenu} to="/news">NEWS</NavLink>
</li>
<li className={style.liMenu}  onClick={() => handleLinkClick('countries')}>
    <div className={activeLink === 'countries' ? style.active : ''}   ></div> 
    <NavLink className={style.navLinkMenu} to="/countries">COUNTRIES</NavLink>
</li>
{/* <li className={style.liMenu}  onClick={() => handleLinkClick('analysis')}>
     <div className={activeLink === 'analysis' ? style.active  : ''}   ></div> 
    <NavLink className={style.navLinkMenu} to="/analysis">ANALYSIS</NavLink>
</li > */}

</ul>

):(null)
}



</div>
 

</ul>
       </nav>


            </div>
{
 isShowSearch ? (
<div  className={style.formSearchMenu}>
<form onSubmit={handleSubmit}>
                <input 
                className='style.search' 
                type='text'  
                value={search}
                onChange={(e)=>setsearch(e.target.value)}
                />
                <button type="submit" className={style.buttonSubmitSearch}>
                 <FontAwesomeIcon 
                  className={style.iconSubmitSearch}  
                  icon={faSearch} />
                 </button>
</form>
</div>) : (   
<div  className={style.bottom}>
            <p>
            Informing disasters worldwide  —
            a service provided by ENGINE GOOGLE EARTH  
            </p>
</div> )}

        </div>
    )
}

export default Header
