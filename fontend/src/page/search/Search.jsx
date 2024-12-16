import React, { useState } from 'react'
import style from './search.module.css'
import img from '../../assets/img/sieu-bao-yagi-anh-huong-den-khu-vuc-nam-bo.jpg'
import { useParams , NavLink,Link, useSearchParams } from 'react-router-dom'
const Search = () => {
    const {search}=useParams()
    const [status,setStatus] =useState('Ongoing')
    console.log(search)
    return (
        <div className={style.containerSearch}>
            <div className={style.main}>
                <div className={style.main1}></div>
                <div className={style.main2}>

                <div className={style.headerSearch}>
                <h2 >Search results</h2>
            </div>
<div className={style.searchNews}> 
<h2 style={{borderLeft:"5px solid red"}}>News</h2>
<div className={style.cardNews}>
<div className={style.headerCardNews}> 

 <p className={style.countryCardNews}><NavLink to="/pagecountry">Việt Nam</NavLink></p>
   <h3 className={style.titleCardNews}>
    <Link to="/pagenews">  Typhoon Yagi</Link>
 
   </h3>
   
</div>

<div className={style.mainCardNews}> 
<img className={style.imgHeaderCardNews} src={img}alt="Description for img " />
<p  className={style.descHeaderCardNews}> Description of the crisis On 7 September 2024, Typhoon Yagi made landfall in Viet Nam, striking Quang Ninh province and Hai Phong city, bringing torrential rain and winds exceeding 200 km/h.
Description of the crisis On 7 September 2024, Typhoon Yagi made landfall in Viet Nam, striking Quang Ninh province and Hai Phong city, bringing torrential rain and winds exceeding 200 km/h.
Description of the crisis On 7 September 2024, Typhoon Yagi made landfall in Viet Nam, striking Quang Ninh province and Hai Phong city, bringing torrential rain and winds exceeding 200 km/h.
Description of the crisis On 7 September 2024, Typhoon Yagi made landfall in Viet Nam, striking Quang Ninh province and Hai Phong city, bringing torrential rain and winds exceeding 200 km/h.
</p>
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
<li className= {style.liFooterCardNews} >
  <p>Content:</p>
  <p> Situation Report </p>
  </li>


</ul>
</div>

    </div>
</div>

<div className={style.searchDisaster}>

<h2 style={{borderLeft:"5px solid red"}}>Disasters</h2>
<div className={style.cardDisater}>


<div className={style.mainCarDisater}> 
<img className={style.imgHeaderCardDisaster} src={img}alt="Description for img " />
<Link to="/pagedisaster">
<p  className={style.descHeaderCardDisater}> Description of the crisis On 7 September 2024, Typhoon Yagi made landfall in Viet Nam, striking Quang Ninh province and Hai Phong city, bringing torrential rain and winds exceeding 200 km/h.
Description of the crisis On 7 September 2024, Typhoon Yagi made landfall in Viet Nam, striking Quang Ninh province and Hai Phong city, bringing torrential rain and winds exceeding 200 km/h.
</p>
</Link>
</div>

<div className={style.footerCardDisater}> 
<ul className= {style.ulFooterCarDisaster}>
<li className= {style.liFooterDisaster} >
 { status==='Ongoing' ? (<p className={style.statusOngoinCarDisaster}></p>):(<p className={style.statusAlertCardNews}></p>)}
  
  <p className={style.statusCardNews}> Ongoing </p>
  </li>

    <li className= {style.liFooterDisaster}>
    <p className={style.typeDisasterCardNews}>Disaster:</p>
    <p>Typhoon</p>
    </li>
  
    <li className= {style.liFooterDisaster}>
    <p className={style.postedCardNews}>Affected country</p>
    <p>Việt Nam</p>
    </li>



</ul>
</div>

    </div>

</div>
                </div>
                <div className={style.main3}></div>
            </div>
           
        </div>
    )
}

export default Search
