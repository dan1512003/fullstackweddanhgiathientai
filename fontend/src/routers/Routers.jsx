import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from '../path/header/Header'
import Disasters from '../page/Disasters/Disasters'
import Countries  from '../page/Countries/Countries'
import News from '../page/News/News'
import Organization from '../page/Organization/Organization'
import Footer from '../path/footer/Footer';
import About from '../page/About/About';
import Contact from '../page/Contact/Contact';
import PageNews from '../page/PageNews/PageNews';
import PageDisaster from '../page/PageDisaster/PageDisaster';
import PageOrganization from '../page/PageOrganization/PageOrganization';
import PageCountry from '../page/PageCountry/PageCountry';
import Analysis from '../page/Analysis/Analysis';
import Search from '../page/search/Search'
const Routers = () => {
    return (
    
          <BrowserRouter>
   <Header />
   <Routes>
    <Route path="/" element={<Disasters />}  />
    <Route path="/countries" element={<Countries />}  />
    <Route path="/news" element={<News />}  />
    <Route path="/organization" element={<Organization />}  />
    <Route path="/disasters" element={<Disasters />}  />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/pagenews" element={<PageNews/>}/>
    <Route path="/pagedisaster" element={<PageDisaster/>}/>
    <Route path="/pageorganization" element={<PageOrganization/>} />
    <Route path="/pagecountry"  element={<PageCountry/>}/>
    <Route path="/analysis" element={<Analysis/>}/>
    <Route path="/pagesearch/:search" element={<Search/>}/>
   </Routes>
   <Footer/>
    </BrowserRouter>
 
    )
}

export default Routers
