const Province = require('../model/country')
const  Country= require('../model/district')

exports.getApiDistrict= async (req,res)=>{
const province  = req.body.selectedValue;
console.log(province)
try{
const idprovince = await  Province.findOne({province:province})
const data =await Country.find({idparent:idprovince._id})
res.json({data: data });
}catch(err){
    console.log(err)
}
}
exports.getCountry=async(req,res)=>{
    const parentId = req.params.id;
    try{
      
      const page = parseInt(req.query.page) || 1;
      const limit = 3;
      const skip = (page - 1) * limit;
      const items = await Country.find({idparent:parentId}).skip(skip).limit(limit);
      const totalItems = await Country.countDocuments({idparent:parentId});
      const totalPages = Math.ceil(totalItems / limit);
       
  res.render("pagegetdistrict",{
     title:"Country page",
     items:items,
     currentPage: page,
     totalPages: totalPages,
     skip:skip,
     idparent:parentId
  })
    }catch(err){
        console.error(err)
        res.json({ message: 'Error saving user', type:'danger' });
    }
     
  }
exports.getPostCountry=(req,res)=>{
    const parentId = req.params.id;
    res.render('pagepostdistrict',{
        title:'Get Post district page',
        idparent:parentId 
    })
    }
exports.postCountry= async(req,res)=>{
    try{
       const { districtdetail,district,idparent} =req.body
       const db= new Country({districtdetail,district,idparent});
       const savedb = await db.save();
       req.session.message={
        type:'success',
        message: 'country add successfully!'
       }
       res.redirect(`/todos/getdistrict/${idparent}`)
    }catch(err){
        console.error(err)
        res.json({ message: 'Error saving user', type:'danger' });
    }
    }


exports.deleteCountry= async(req,res)=>{
    let id =req.params.id
 
    console.log(id)
    try{
      const data =  await  Country.findById(id)
       await Country.findByIdAndDelete(id)
       req.session.message={
        type:'success',
        message: 'country delete successfully!'
       }
       res.redirect(`/todos/getdistrict/${data.idparent}`)
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
   res.render('pageupdatedistrict',{
    title:'Update Page',
    country:db,
})

    }catch(err){
console.log(err)
    }

}

exports.updateCountry=async(req,res)=>{
    let id=req.params.id
    try{
        const {districtdetail,district,idparent} =req.body
        await Country.findByIdAndUpdate(id,{districtdetail,district,idparent})
        req.session.message={
            type:'success',
            message: 'country update successfully!'
           }
           res.redirect(`/todos/getdistrict/${idparent}`)
    }catch(err){

       res.json({message: err.message ,type:'danger'})

    }
}