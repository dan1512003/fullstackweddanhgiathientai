const  New= require('../model/new')
const  Country= require('../model/country')
const  Disaster= require('../model/typedisaster')
exports.getApiFilterNew=async (req, res) => {
  const { disaster,country,limit,currentpage } = req.query;
  console.log(country)
  console.log(disaster)
  const skip = (parseInt(currentpage)- 1) *parseInt(limit);
 console.log(limit)
console.log(skip)
console.log(currentpage)
  try {
    let query = {};
   
  if(country){
      const countryArray = country.split(','); 
//       query.province =   { $expr: {
//         $gt: [
//             { $size: { $setIntersection: [ { $split: ["$province", ","] }, countryArray ] } },
//             0
//         ]
const regex = new RegExp(countryArray.join('|'), 'i')
  query.province = { $regex: regex };
  }
// }; 
  //  }
    if (disaster) {
      const disasterArray = disaster.split(',');  
      query.disaster = { $in: disasterArray };    
    }
    console.log('query:',query)
    const items = await New.find(query).skip(skip).limit(parseInt(limit));
console.log('ITEMS FINDS',items)

  const totalItems = await New.countDocuments(query);
  const totalPages = Math.ceil(totalItems / parseInt(limit) );

  console.log('totalItems',totalItems)
  console.log('totalPage',totalPages)
    res.json({
      data:  items,
      totalPages,
      currentPage: parseInt(currentpage)
    }
    );
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}


exports.getApinameNew=async (req, res) => {
  const id = req.query.id
    const name = req.query.name;
    let query = {};
   
    if(name){
   
      console.log(name)
        const countryArray = name.split(','); 
        console.log('array relation country :',countryArray)
  //       query.province =   { $expr: {
  //         $gt: [
  //             { $size: { $setIntersection: [ { $split: ["$province", ","] }, countryArray ] } },
  //             0
  //         ]
  const regex = new RegExp(countryArray.join('|'), 'i')
  query.province = { $regex: regex };
  console.log(query)
  if(id){
    query._id ={$ne: id }
  }
  
    }
    try {


      const news=  await New.find(query)
        .sort({ createdAt: -1 })
        .limit(4);

   
  console.log('relation news find',news)
      if (!news) {
        return res.status(404).json({ error: 'Country not found' });
      }
  
      res.json(news);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  }

exports.getApiIdNew=async (req, res) => {
    const id = req.params.id;
  
    try {
      const news = await New.findById(id);
  
      if (!news) {
        return res.status(404).json({ error: 'Country not found' });
      }
  
      res.json(news);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  }

exports.getApiNew= async(req,res)=>{
  const { limit,currentpage } = req.query;
  const skip = (parseInt(currentpage)- 1) *parseInt(limit);
  const totalItems = await New.countDocuments();
  const totalPages = Math.ceil(totalItems / parseInt(limit) );

 console.log('api new',limit)
 console.log('api new',skip)
 console.log('current page',currentpage)

    try{
   await New.find().skip(skip).limit(parseInt(limit))
        .then(New =>res.json({
         data:New,
         totalPages,
         currentPage: parseInt(currentpage)
       
        }))
        .catch(err =>res.json(err))
 
    }catch(err){
        console.error(err)
        res.json({ message: 'Error find New', type:'danger' });
    }
    
    }


exports.getNew=async(req,res)=>{
    try{
  
      const page = parseInt(req.query.page) || 1;
      const limit = 3;
      const skip = (page - 1) * limit;
      const items = await New.find().skip(skip).limit(limit);
      const totalItems = await New.countDocuments();
      const totalPages = Math.ceil(totalItems / limit);
  
  res.render("pagegetnew",{
     title:"New page",
     items:items,
     currentPage: page,
     totalPages: totalPages,
     skip:skip,
  })
    }catch(err){
        console.error(err)
        res.json({ message: 'Error saving new', type:'danger' });
    }
     
  }

exports.getPostNew=async(req,res)=>{
  

    try{
        const country = await Country.find()
        const disaster = await Disaster.find()
        console.log(country)
        console.log(disaster)
        res.render("pagepostnew",{
            title:'page post new' ,
            country:country,
            disaster:disaster
       
        })
    }catch(err){
        console.error(err)
        res.json({ message: 'Error findfile', type:'danger' });
    }
}
exports.postNew=async(req,res)=>{
    try{
       
       const db= new New({
        province: req.body.province,
        disaster: req.body.disaster,
        datepost: req.body.datepost,
        title: req.body.title,
        description: req.body.description,
        content:req.body.content,
        img:req.file.filename,
    });
       await db.save();
       req.session.message={
        type:'success',
        message: 'country add successfully!'
       }
       res.redirect("/todos/getnew")
    }catch(err){
        console.error(err)
        res.json({ message: 'Error saving disaster', type:'danger' });
    }
    }

    exports.deleteNew= async(req,res)=>{
        let id =req.params.id
        console.log(id)
        try{
           await New.findByIdAndDelete(id)
           req.session.message={
            type:'success',
            message: 'disaster delete successfully!'
           }
           res.redirect("/todos/getnew")
        }catch(err){
            console.error(err)
            res.json({ message: 'Error saving disaster', type:'danger' });
        }
    
    }

exports.getUpdateNew= async(req,res)=>{

    let id= req.params.id
    console.log(id)
    try{
    const country = await Country.find()
     const disaster = await Disaster.find()
   const db= await New.findById(id)
   console.log(db)
   if(db == null){
    
    res.redirect('/todos/getnew')
   }
   else{
    res.render('pageupdatenew',{
        title:'Update Page',
        news:db,
        country:country,
        disaster:disaster,
    })
   }
    }catch(err){
res.redirect('/todos/getnew')
    }

}
exports.updateNew=async(req,res)=>{
    let id=req.params.id
    try{
      
        await New.findByIdAndUpdate(id,{
            province: req.body.province,
            disaster: req.body.disaster,
            datepost: req.body.datepost,
            title: req.body.title,
            description: req.body.description,
            content:req.body.content,
            img:req.file.filename,

        })
        req.session.message={
            type:'success',
            message: 'news update successfully!'
           }
           res.redirect("/todos/getnew")
    }catch(err){

       res.json({message: err.message ,type:'danger'})

    }
}