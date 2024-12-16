const Country = require('../model/country')
const Disaster = require('../model/typedisaster')
const NewDisaster = require('../model/disasternew')
const fs =require('fs');
const {  GoogleAuth } = require('google-auth-library');
var ee =require('@google/earthengine');
const { rejects } = require('assert');
const { randomBytes } = require('crypto');
const { datapipelines } = require('googleapis/build/src/apis/datapipelines');
const district = require('../model/district');


exports.getApiLandslide=async (req,res)=>{

  key=process.env.service_account_key
  var coordinateArray =[]
  try{
    const dataongoing=  await NewDisaster.find({status:"Ongoing",disaster:"Landslide"})

   dataongoing.map(data=>{
   data.coordinate.map(item=>{
    coordinateArray.push({longitude:item.longitude,latitude:item.latitude,scope:data.scope})
       }) 
       
     
     })

    const now = new Date();
    let query = {};
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); 
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    console.log(startOfMonth)
    console.log(endOfMonth)
    query.disaster="Landslide"
    query.enddate={ 
      $gte: startOfMonth,
      $lte: endOfMonth,}
    const datapass= await NewDisaster.find(query)
    if(datapass){
    datapass.map(data=>{
      
      data.coordinate.map(item=>{
        coordinateArray.push({longitude:item.longitude,latitude:item.latitude,scope:data.scope})
           }) 
       })
    }

    console.log(dataongoing)
    console.log(datapass)
    console.log('coordinatetest:',coordinateArray )
    const serviceAccountCredentials = JSON.parse(key);
  
    ee.data.authenticateViaPrivateKey(
      serviceAccountCredentials,
      () =>
        ee.initialize(
          null,
          null,
          function(){
         
         
          
            
           
        
            
            var pointFeatures = coordinateArray.map(function(location) {
              return ee.Feature(ee.Geometry.Point([ee.Number.parse(location.longitude), ee.Number.parse(location.latitude)]), {
              scope:ee.Number.parse(location.scope)
              });
            });
          // Đơn vị là mét
            
            // Tạo các buffer cho mỗi điểm
            var buffers = pointFeatures.map(function(feature) {
              return feature.buffer(feature.get('scope')); 
            // Tạo buffer cho mỗi điểm
            });
            var bufferCollection = ee.FeatureCollection(buffers);
                                      
            
            
  
            var vis = {
              color: 'red',
              opacity: 0.3
              };
   
              var imageGeom = bufferCollection.geometry();
              bufferCollection.getMapId(vis, function(map,error) {
                error ? rejects(new Error(error))   : 
                imageGeom.evaluate((result, error) =>
                  error ? rejects(new Error(error)) : res.json({
                    urlFormat:map.urlFormat,
                    geojson:result,
                    dataongoing:dataongoing,
                    datapass:datapass
                  })   
                )
              });
     
  
  
          },
          (error) => rejects(new Error(error))
        ),
         (error) => {
             res.send('Authentication error:', error);
           }
    );
   
   
    
   


  }catch(err){
    console.log(err)
  }


}
exports.getApiFlood=async (req,res)=>{

  key=process.env.service_account_key
  var coordinateArray =[]
  try{
    const dataongoing=  await NewDisaster.find({status:"Ongoing",disaster:"Flood"})

   dataongoing.map(data=>{
   data.coordinate.map(item=>{
    coordinateArray.push({longitude:item.longitude,latitude:item.latitude,scope:data.scope})
       }) 
       
     
     })

    const now = new Date();
    let query = {};
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); 
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    console.log(startOfMonth)
    console.log(endOfMonth)
    query.disaster="Flood"
    query.enddate={ 
      $gte: startOfMonth,
      $lte: endOfMonth,}
    const datapass= await NewDisaster.find(query)
    if(datapass){
    datapass.map(data=>{
      
      data.coordinate.map(item=>{
        coordinateArray.push({longitude:item.longitude,latitude:item.latitude,scope:data.scope})
           }) 
       })
    }

    console.log(dataongoing)
    console.log(datapass)
    console.log('coordinatetest:',coordinateArray )
    const serviceAccountCredentials = JSON.parse(key);
  
    ee.data.authenticateViaPrivateKey(
      serviceAccountCredentials,
      () =>
        ee.initialize(
          null,
          null,
          function(){
         
         
          
            
           
        
            
            var pointFeatures = coordinateArray.map(function(location) {
              return ee.Feature(ee.Geometry.Point([ee.Number.parse(location.longitude), ee.Number.parse(location.latitude)]), {
              scope:ee.Number.parse(location.scope)
              });
            });
          // Đơn vị là mét
            
            // Tạo các buffer cho mỗi điểm
            var buffers = pointFeatures.map(function(feature) {
              return feature.buffer(feature.get('scope')); 
            // Tạo buffer cho mỗi điểm
            });
            var bufferCollection = ee.FeatureCollection(buffers);
                                      
            
            
  
            var vis = {
              color: 'red',
              opacity: 0.3
              };
   
              var imageGeom = bufferCollection.geometry();
              bufferCollection.getMapId(vis, function(map,error) {
                error ? rejects(new Error(error))   : 
                imageGeom.evaluate((result, error) =>
                  error ? rejects(new Error(error)) : res.json({
                    urlFormat:map.urlFormat,
                    geojson:result,
                    dataongoing:dataongoing,
                    datapass:datapass
                  })   
                )
              });
     
  
  
          },
          (error) => rejects(new Error(error))
        ),
         (error) => {
             res.send('Authentication error:', error);
           }
    );
   
   
    
   


  }catch(err){
    console.log(err)
  }


}

exports.getApiEarthQuake=async (req,res)=>{
  key=process.env.service_account_key
  var coordinateArray =[]
  try{
    const dataongoing=  await NewDisaster.find({status:"Ongoing",disaster:"Earthquake"})

   dataongoing.map(data=>{
   data.coordinate.map(item=>{
    coordinateArray.push({longitude:item.longitude,latitude:item.latitude,scope:data.scope})
       }) 
       
     
     })

    const now = new Date();
    let query = {};
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); 
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    console.log(startOfMonth)
    console.log(endOfMonth)
    query.disaster="Earthquake"
    query.enddate={ 
      $gte: startOfMonth,
      $lte: endOfMonth,}
    const datapass= await NewDisaster.find(query)
    if(datapass){
    datapass.map(data=>{
      
      data.coordinate.map(item=>{
        coordinateArray.push({longitude:item.longitude,latitude:item.latitude,scope:data.scope})
           }) 
       })
    }

    console.log(dataongoing)
    console.log(datapass)
    console.log('coordinatetest:',coordinateArray )
    const serviceAccountCredentials = JSON.parse(key);
  
    ee.data.authenticateViaPrivateKey(
      serviceAccountCredentials,
      () =>
        ee.initialize(
          null,
          null,
          function(){
         
         
          
            
           
        
            
            var pointFeatures = coordinateArray.map(function(location) {
              return ee.Feature(ee.Geometry.Point([ee.Number.parse(location.longitude), ee.Number.parse(location.latitude)]), {
              scope:ee.Number.parse(location.scope)
              });
            });
          // Đơn vị là mét
            
            // Tạo các buffer cho mỗi điểm
            var buffers = pointFeatures.map(function(feature) {
              return feature.buffer(feature.get('scope')); 
            // Tạo buffer cho mỗi điểm
            });
            var bufferCollection = ee.FeatureCollection(buffers);
                                      
            
            
  
            var vis = {
              color: 'red',
              opacity: 0.3
              };
   
              var imageGeom = bufferCollection.geometry();
              bufferCollection.getMapId(vis, function(map,error) {
                error ? rejects(new Error(error))   : 
                imageGeom.evaluate((result, error) =>
                  error ? rejects(new Error(error)) : res.json({
                    urlFormat:map.urlFormat,
                    geojson:result,
                    dataongoing:dataongoing,
                    datapass:datapass
                  })   
                )
              });
     
  
  
          },
          (error) => rejects(new Error(error))
        ),
         (error) => {
             res.send('Authentication error:', error);
           }
    );
   
   
    
   


  }catch(err){
    console.log(err)
  }


}
exports.getApiTyphoon=async (req,res)=>{
  key=process.env.service_account_key
  const dataongoing=  await NewDisaster.find({status:"Ongoing",disaster:"Typhoon"})

var provinceArray =[]
console.log(dataongoing)

dataongoing.map(data=>{
 provinceArray.push(data.province.trim())


})





const now = new Date();
let query = {};
const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); 
const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
console.log(startOfMonth)
console.log(endOfMonth)
query.disaster="Typhoon"
query.enddate={ 
  $gte: startOfMonth,
  $lte: endOfMonth,}
const datapass= await NewDisaster.find(query)

if(datapass){
  datapass.map(data=>{
    provinceArray.push(data.province.trim())
   })
}
const province =provinceArray.join(',')
const provnceArrayOfString=province.split(','); 
var proviceJsonString = JSON.stringify({provinces:provnceArrayOfString});
var provincesJson = {
  "provinces": ["Quang Binh","Quang Tri","Thua Thien - Hue","Da Nang City"]
};
const proviceJson = JSON.parse(proviceJsonString)
console.log('json:',proviceJson)
console.log('json',provincesJson)
   try {
    // Đọc file JSON của Service Account
    const serviceAccountCredentials = JSON.parse(key);
  
    ee.data.authenticateViaPrivateKey(
      serviceAccountCredentials,
      () =>
        ee.initialize(
          null,
          null,
          function(){
         
         
          
            
           
        
            
            var vietnamAdminLevel1 = ee.FeatureCollection('FAO/GAUL/2015/level1')
            .filter(ee.Filter.eq('ADM0_NAME', 'Viet Nam')); 
            
                                      var coloredProvinces = vietnamAdminLevel1.map(function(feature) {
                                        // Lấy tên tỉnh (ADM1_NAME) trong mỗi feature
                                        var provinceName = feature.get('ADM1_NAME');
                                        
                                        // Kiểm tra nếu tên tỉnh có nằm trong danh sách tỉnh của JSON không
                                        var isTargetProvince = ee.List(proviceJson.provinces).contains(provinceName);
                                        
                                        // Nếu tỉnh nằm trong danh sách, gán màu đỏ, nếu không thì màu xanh
                                        var color = ee.Algorithms.If(isTargetProvince, "green", "white");
                                        
                                        // Thêm thuộc tính màu vào feature
                                      return feature.set('style', { fillColor: color,width: 1,strokeColor:'000000',strokeWidth: 1});
                                      });
                                      
            
            
  
            var vis = {
              opacity: 0.3
              };
   
           var imageGeom = vietnamAdminLevel1.geometry();
           
           coloredProvinces.style({styleProperty: 'style'}).getMapId(vis, function(map,error) {
               error ? rejects(new Error(error))   : 
               imageGeom.evaluate((result, error) =>
                 error ? rejects(new Error(error)) : res.json({
                   urlFormat:map.urlFormat,
                   geojson:result,
                   dataongoing:dataongoing,
                   datapass:datapass
                 })   
               )
             });
     
  
  
          },
          (error) => rejects(new Error(error))
        ),
         (error) => {
             res.send('Authentication error:', error);
           }
    );
  

    
   
  
   
    } catch (error) {
      console.error('Authentication error:', error);
      res.status(500).send('Authentication failed');
    }

}
exports.getApiDrought=async (req,res)=>{
  key=process.env.service_account_key
  const dataongoing=  await NewDisaster.find({status:"Ongoing",disaster:"Drought"})

var provinceArray =[]
var districtArray =[]
console.log(dataongoing)

dataongoing.map(data=>{
 provinceArray.push(data.province.trim())
 districtArray.push(data.district.trim())

})





const now = new Date();
let query = {};
const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); 
const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
console.log(startOfMonth)
console.log(endOfMonth)
query.disaster="Drought"
query.enddate={ 
  $gte: startOfMonth,
  $lte: endOfMonth,}
const datapass= await NewDisaster.find(query)

if(datapass){
  datapass.map(data=>{
    provinceArray.push(data.province.trim())
    districtArray.push(data.district.trim())
   })
}
const province =provinceArray.join(',')
const district =districtArray.join(',')
const provnceArrayOfString=province.split(','); 
const districtArrayOfString=district.split(',')
var proviceJsonString = JSON.stringify({provinces:provnceArrayOfString});
var districtJsonString =JSON.stringify({districts:districtArrayOfString})
var provincesJson = {
  "provinces": ["Quang Binh","Quang Tri","Thua Thien - Hue","Da Nang City"]
};
const districtJson = JSON.parse(districtJsonString)
const proviceJson = JSON.parse(proviceJsonString)
console.log('json:',proviceJson)
console.log('json',provincesJson)
console.log('json',districtJson)
console.log(datapass)
   try {
    // Đọc file JSON của Service Account
    const serviceAccountCredentials = JSON.parse(key);
  
    ee.data.authenticateViaPrivateKey(
      serviceAccountCredentials,
      () =>
        ee.initialize(
          null,
          null,
          function(){
         
         
          
            
           
        
            
            var vietnamAdminLevel1 = ee.FeatureCollection('FAO/GAUL/2015/level2')
            .filter(ee.Filter.eq('ADM0_NAME', 'Viet Nam')); 
            var filteredProvinces = vietnamAdminLevel1.filter(ee.Filter.inList('ADM1_NAME',proviceJson.provinces));   
            
             var coloredProvinces = filteredProvinces.map(function(feature) {
                                       
                                        var districtName = feature.get('ADM2_NAME');
                                        
                                       
                                        var isTargetDistrict = ee.List(districtJson.districts).contains(districtName);
                                        
                                        
                                        var color = ee.Algorithms.If(isTargetDistrict, "yellow", "white");
                                        
                                        // Thêm thuộc tính màu vào feature
                                      return feature.set('style', { fillColor: color,width: 1,strokeColor:'000000',strokeWidth: 1});
                                      });
                                      
            
            
  
            var vis = {
              opacity: 0.3
              };
   
           var imageGeom = vietnamAdminLevel1.geometry();
           
           coloredProvinces.style({styleProperty: 'style'}).getMapId(vis, function(map,error) {
               error ? rejects(new Error(error))   : 
               imageGeom.evaluate((result, error) =>
                 error ? rejects(new Error(error)) : res.json({
                   urlFormat:map.urlFormat,
                   geojson:result,
                   dataongoing:dataongoing,
                   datapass:datapass
                 })   
               )
             });
     
  
  
          },
          (error) => rejects(new Error(error))
        ),
         (error) => {
             res.send('Authentication error:', error);
           }
    );
  

    
   
  
   
    } catch (error) {
      console.error('Authentication error:', error);
      res.status(500).send('Authentication failed');
    }

}
exports.getApiSaltwaterIntrusion=async (req,res)=>{
  key=process.env.service_account_key
  const dataongoing=  await NewDisaster.find({status:"Ongoing",disaster:"Saltwater intrusion"})


var provinceArray =[]
var districtArray =[]
console.log(dataongoing)

dataongoing.map(data=>{
 provinceArray.push(data.province.trim())
 districtArray.push(data.district.trim())

})





const now = new Date();
let query = {};
const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); 
const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
console.log(startOfMonth)
console.log(endOfMonth)
query.disaster="Saltwater intrusion"
query.enddate={ 
  $gte: startOfMonth,
  $lte: endOfMonth,}
const datapass= await NewDisaster.find(query)

if(datapass){
  datapass.map(data=>{
    provinceArray.push(data.province.trim())
    districtArray.push(data.district.trim())
   })
}
const province =provinceArray.join(',')
const district =districtArray.join(',')
const provnceArrayOfString=province.split(','); 
const districtArrayOfString=district.split(',')
var proviceJsonString = JSON.stringify({provinces:provnceArrayOfString});
var districtJsonString =JSON.stringify({districts:districtArrayOfString})
var provincesJson = {
  "provinces": ["Quang Binh","Quang Tri","Thua Thien - Hue","Da Nang City"]
};
const districtJson = JSON.parse(districtJsonString)
const proviceJson = JSON.parse(proviceJsonString)
console.log('json:',proviceJson)
console.log('json',provincesJson)
console.log('json',districtJson)
console.log(datapass)
   try {
    // Đọc file JSON của Service Account
    const serviceAccountCredentials = JSON.parse(key);
  
    ee.data.authenticateViaPrivateKey(
      serviceAccountCredentials,
      () =>
        ee.initialize(
          null,
          null,
          function(){
         
         
          
            
           
        
            
            var vietnamAdminLevel1 = ee.FeatureCollection('FAO/GAUL/2015/level2')
            .filter(ee.Filter.eq('ADM0_NAME', 'Viet Nam')); 
            var filteredProvinces = vietnamAdminLevel1.filter(ee.Filter.inList('ADM1_NAME',proviceJson.provinces));   
            
             var coloredProvinces = filteredProvinces.map(function(feature) {
                                       
                                        var districtName = feature.get('ADM2_NAME');
                                        
                                       
                                        var isTargetDistrict = ee.List(districtJson.districts).contains(districtName);
                                        
                                        
                                        var color = ee.Algorithms.If(isTargetDistrict, "orange", "white");
                                        
                                        // Thêm thuộc tính màu vào feature
                                      return feature.set('style', { fillColor: color,width: 1,strokeColor:'000000',strokeWidth: 1});
                                      });
                                      
            
            
  
            var vis = {
              opacity: 0.3
              };
   
           var imageGeom = vietnamAdminLevel1.geometry();
           
           coloredProvinces.style({styleProperty: 'style'}).getMapId(vis, function(map,error) {
               error ? rejects(new Error(error))   : 
               imageGeom.evaluate((result, error) =>
                 error ? rejects(new Error(error)) : res.json({
                   urlFormat:map.urlFormat,
                   geojson:result,
                   dataongoing:dataongoing,
                   datapass:datapass
                 })   
               )
             });
     
  
  
          },
          (error) => rejects(new Error(error))
        ),
         (error) => {
             res.send('Authentication error:', error);
           }
    );
  

    
   
  
   
    } catch (error) {
      console.error('Authentication error:', error);
      res.status(500).send('Authentication failed');
    }

}
exports.getApinameNewDisaster=async (req, res) => {
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
  
  
        const news=  await NewDisaster.find(query)
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
  
  exports.getApiIdNewDisaster=async (req, res) => {
      const id = req.params.id;
    
      try {
        const news = await NewDisaster.findById(id);
    
        if (!news) {
          return res.status(404).json({ error: 'Country not found' });
        }
    
        res.json(news);
      } catch (err) {
        res.status(500).json({ error: 'Server error' });
      }
    }



exports.getApiFilterNewDisaster=async (req, res) => {
    const { disaster,country,status,limit,currentpage } = req.query;
    console.log(country)
    console.log(disaster)
    console.log(status)
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

      if(status){
        const statusArray = status.split(',');  
        query.status = { $in: statusArray }; 

      }
      console.log('query:',query)
      const items = await NewDisaster.find(query).skip(skip).limit(parseInt(limit));
  console.log('ITEMS FINDS',items)
  
    const totalItems = await NewDisaster.countDocuments(query);
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
  
exports.getApiNewDisaster= async(req,res)=>{
    const { limit,currentpage } = req.query;
    const skip = (parseInt(currentpage)- 1) *parseInt(limit);
    const totalItems = await NewDisaster.countDocuments();
    const totalPages = Math.ceil(totalItems / parseInt(limit) );
  
   console.log('api new',limit)
   console.log('api new',skip)
   console.log('current page',currentpage)
  
      try{
     await NewDisaster.find().skip(skip).limit(parseInt(limit))
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
  

exports.getNewDisaster= async(req,res)=>{
    try{
  
        const page = parseInt(req.query.page) || 1;
        const limit = 3;
        const skip = (page - 1) * limit;
        const items = await NewDisaster.find().skip(skip).limit(limit);
        const totalItems = await NewDisaster.countDocuments();
        const totalPages = Math.ceil(totalItems / limit);
    
    
    res.render("pagegetdisasternew",{
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
 exports.getPostNewDisaster=async(req,res)=>{
  

    try{
        const country = await Country.find()
        const disaster = await Disaster.find()
        console.log(country)
        console.log(disaster)
        res.render("pagepostdisasternew",{
            title:'page post disaster new' ,
            country:country,
            disaster:disaster
       
        })
    }catch(err){
        console.error(err)
        res.json({ message: 'Error findfile', type:'danger' });
    }
}
exports.postNewDisaster=async(req,res)=>{

    // const receivedData = req.body; // Nhận dữ liệu JSON
    // console.log('Dữ liệu nhận được:', receivedData);
    try{
        const coordinat = [
          { latitude: 21.028511, longitude: 105.804817 },  
          { latitude: 20.997887, longitude: 105.485282 },  
          { latitude: 22.006578, longitude: 106.335978 }  
        ];
    const coordinateres = `${req.body.coordinate}`
    const coordinate = JSON.parse(coordinateres)
    
    console.log(coordinate);

        console.log(coordinat)
       const db= new NewDisaster({
        coordinate:coordinate,
        district:req.body.district,
        province: req.body.province,
        region:req.body.region,
        disaster: req.body.disaster,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        title: req.body.title,
        description: req.body.description,
        icon:req.file.filename,
        status:req.body.status,
        scope:req.body.scope
    });
       await db.save();
       req.session.message={
        type:'success',
       message: 'country add successfully!'
       }
       res.redirect("/todos/getnewdisaster")
    }catch(err){
       console.error(err)
        res.json({ message: 'Error saving disaster', type:'danger' });
     }
    }
 
    exports.deleteNewDisaster= async(req,res)=>{
        let id =req.params.id
        console.log(id)
        try{
           await NewDisaster.findByIdAndDelete(id)
           req.session.message={
            type:'success',
            message: 'disaster delete successfully!'
           }
           res.redirect("/todos/getnewdisaster")
        }catch(err){
            console.error(err)
            res.json({ message: 'Error saving disaster', type:'danger' });
        }
    
    }

 exports.getUpdateNewDisaster= async(req,res)=>{

    let id= req.params.id
    console.log(id)
    try{
    const country = await Country.find()
    const disaster = await Disaster.find()
    const db= await NewDisaster.findById(id)
   console.log(db)
   if(db == null){
    
    res.redirect('/todos/getnewdisaster')
   }
   else{
    res.render('pageupdatedisasternew',{
        title:'Update Page',
        newdisaster:db,
        country:country,
        disaster:disaster,
    })
   }
    }catch(err){
res.redirect('/todos/getnewdisaster')
    }

}
exports.updateNewDisaster=async(req,res)=>{
    let id=req.params.id
    try{
      const coordinateres = `${req.body.coordinate}`
      const coordinate = JSON.parse(coordinateres)
        await NewDisaster.findByIdAndUpdate(id,{
        coordinate:coordinate,
        province: req.body.province,
        region:req.body.region,
        disaster: req.body.disaster,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        title: req.body.title,
        description: req.body.description,
        icon:req.file.filename,
        status:req.body.status,
        scope:req.body.scope,
        district:req.body.district,
        })
        req.session.message={
            type:'success',
            message: 'news update successfully!'
           }
           res.redirect("/todos/getnewdisaster")
    }catch(err){

       res.json({message: err.message ,type:'danger'})

    }
}