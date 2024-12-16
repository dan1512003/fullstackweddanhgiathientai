const  Disaster= require('../model/typedisaster')

exports.getApiTypeDisaster= async(req,res)=>{
    try{
        await Disaster.find()
        .then(Disaster =>res.json(Disaster))
        .catch(err =>res.json(err))
    
    }catch(err){
        console.error(err)
        res.json({ message: 'Error find Type Disaster', type:'danger' });
    }
    
    }

exports.getTypeDisaster=async(req,res)=>{
    try{
  
      const page = parseInt(req.query.page) || 1;
      const limit = 3;
      const skip = (page - 1) * limit;
      const items = await Disaster.find().skip(skip).limit(limit);
      const totalItems = await Disaster.countDocuments();
      const totalPages = Math.ceil(totalItems / limit);
  
  res.render("pagegettypedisaster",{
     title:"Type Disaster page",
     items:items,
     currentPage: page,
     totalPages: totalPages,
     skip:skip,
  })
    }catch(err){
        console.error(err)
        res.json({ message: 'Error saving disaster', type:'danger' });
    }
     
  }
exports.getPostTypeDisaster=(req,res)=>{
    res.render('pageposttypedisaster',{
       title: 'Type Disaster Page'
    })
}
exports.postTypeDisaster= async(req,res)=>{
    try{
       const {disaster} =req.body
       const db= new Disaster({disaster});
       await db.save();
       req.session.message={
        type:'success',
        message: 'country add successfully!'
       }
       res.redirect("/todos/gettypedisaster")
    }catch(err){
        console.error(err)
        res.json({ message: 'Error saving disaster', type:'danger' });
    }
    }

    exports.deleteTypeDisaster= async(req,res)=>{
        let id =req.params.id
        console.log(id)
        try{
           await Disaster.findByIdAndDelete(id)
           req.session.message={
            type:'success',
            message: 'disaster delete successfully!'
           }
           res.redirect("/todos/gettypedisaster")
        }catch(err){
            console.error(err)
            res.json({ message: 'Error saving disaster', type:'danger' });
        }
    
    }

exports.getUpdateTypheDisaster= async(req,res)=>{

    let id= req.params.id
    console.log(id)
    try{
   const db= await Disaster.findById(id)
   console.log(db)
   if(db == null){
    
    res.redirect('/todos/gettypedisaster')
   }
   else{
    res.render('pageupdatetypedisaster',{
        title:'Update Page',
        disaster:db,
    })
   }
    }catch(err){
res.redirect('/todos/gettypedisaster')
    }

}

exports.updateTypeDisaster=async(req,res)=>{
    let id=req.params.id
    try{
        const {disaster} =req.body
        await Disaster.findByIdAndUpdate(id,{disaster})
        req.session.message={
            type:'success',
            message: 'disaster update successfully!'
           }
           res.redirect("/todos/gettypedisaster")
    }catch(err){

       res.json({message: err.message ,type:'danger'})

    }
}