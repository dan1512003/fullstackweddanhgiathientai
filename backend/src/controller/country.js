
const { Query } = require('mongoose');
const country = require('../model/country');
const  Country= require('../model/country')
const moment = require('moment');
const readlineSync = require('readline-sync');
exports.getApiCoordinates=async (req, res) => {
    const startOfMonth = moment().startOf('month').toDate();
    const endOfMonth = moment().endOf('month').toDate();
console.log(startOfMonth)
console.log(endOfMonth)
  }

exports.getApiAutoComplete=async (req, res) => {
    const query = req.query.q
    console.log(query)
    if (!query) {
      return res.json(['ok']);
    }
  
  
    const regex = new RegExp(query,'i') 
    const keywords = await Country.find({provincedetail:regex }).limit(10); // Giới hạn 10 kết quả
  console.log(keywords)
    res.json(keywords);
  }
exports.getApiCountry= async(req,res)=>{
    try{
        await Country.find()
        .then(country =>res.json(country))
        .catch(err =>res.json(err))
    
    }catch(err){
        console.error(err)
        res.json({ message: 'Error find country', type:'danger' });
    }
    
    }
exports.getCountry=async(req,res)=>{
    try{
      


      const page = parseInt(req.query.page) || 1;
      const limit = 3;
      const skip = (page - 1) * limit;
      const items = await Country.find().skip(skip).limit(limit);
      const totalItems = await Country.countDocuments();
      const totalPages = Math.ceil(totalItems / limit);
       
  res.render("pagegetcountry",{
     title:"Country page",
     items:items,
     currentPage: page,
     totalPages: totalPages,
     skip:skip,
  })
    }catch(err){
        console.error(err)
        res.json({ message: 'Error saving user', type:'danger' });
    }
     
  }
exports.getPostCountry=(req,res)=>{
    res.render('pagepostcountry',{title:'Get Post Country page'})
    }
exports.postCountry= async(req,res)=>{
    try{
       const { provincedetail,province} =req.body
       const db= new Country({provincedetail,province});
       const savedb = await db.save();
       req.session.message={
        type:'success',
        message: 'country add successfully!'
       }
       res.redirect("/todos")
    }catch(err){
        console.error(err)
        res.json({ message: 'Error saving user', type:'danger' });
    }
    }


exports.deleteCountry= async(req,res)=>{
    let id =req.params.id
    console.log(id)
    try{
       await Country.findByIdAndDelete(id)
       req.session.message={
        type:'success',
        message: 'country delete successfully!'
       }
       res.redirect("/todos")
    }catch(err){
        console.error(err)
        res.json({ message: 'Error saving user', type:'danger' });
    }

}

exports.getUpdateCountry= async(req,res)=>{

    let id= req.params.id
    console.log(id)
    try{
   const db= await Country.findById(id)
   console.log(db)
   if(db == null){
    
    res.redirect('/todos')
   }
   else{
    res.render('pageupdatecountry',{
        title:'Update Page',
        country:db,
    })
   }
    }catch(err){
res.redirect('/todos')
    }

}

exports.updateCountry=async(req,res)=>{
    let id=req.params.id
    try{
        const {provincedetail,province} =req.body
        await Country.findByIdAndUpdate(id,{provincedetail,province})
        req.session.message={
            type:'success',
            message: 'country update successfully!'
           }
           res.redirect("/todos")
    }catch(err){

       res.json({message: err.message ,type:'danger'})

    }
}