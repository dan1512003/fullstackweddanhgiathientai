const DisasterNew =require('../model/disasternew')
const Province =require('../model/country')
const fs =require('fs');
const {  GoogleAuth } = require('google-auth-library');
var ee =require('@google/earthengine');
const { rejects } = require('assert');
const { randomBytes } = require('crypto');
require('dotenv').config();

exports.getApiAnalysis=async (req, res) => {
 
    key=process.env.service_account_key
   
  try {
   
    let query = {};
 const { disaster,province,startdate,enddate } = req.query;
    console.log(disaster)
    console.log(province)
    console.log(startdate)
    console.log(enddate)

    const ProvinceFind = await Province.findOne({ provincedetail: province});
    if(province){

    
      console.log(ProvinceFind.province)
      const countryArray = province.split(','); 
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
    if(startdate && enddate){
      query.postdate={ 
        $gte: new Date(startdate),
        $lte: new Date(enddate),}
    
    
      
      }
      const startDate = new Date(startdate);
      const endDate = new Date(enddate);
      
      const timeDifference = endDate - startDate; 
   
      const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      console.log('khoảng thời gian :',daysDifference)
      console.log('query',query)
      const items = await DisasterNew.find(query)
      console.log('ITEMS FINDS',items)
      var totalItems = await DisasterNew.countDocuments(query);
      var ratio =0
      var performance = ""
      var level =""
      if(totalItems!=0){
         ratio =totalItems/daysDifference
      }
      
      if(totalItems >=0 && totalItems<=1){
        performance="seldom"
      }
     if(totalItems > 1 && totalItems <=3){
        performance="many"
      }
     if(totalItems>3){
          performance="lot"
        }
        if(ratio >= 0.03 ){
         level="danger"
        }
        if(ratio<=0.03){
          level="safe"
        }
        console.log('tỉ lệ :',ratio)
        console.log('performance:',performance)
        console.log("level:",level)
    // Đọc file JSON của Service Account
    const serviceAccountCredentials = JSON.parse(key);
  
    ee.data.authenticateViaPrivateKey(
      serviceAccountCredentials,
      () =>
        ee.initialize(
          null,
          null,
          function(){
            // const col = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED");
            // // Geojson geometry of the are we want
            // const geojson = {
            //   coordinates: [
            //     [
            //       [103.57567457694688, -1.5538708282870601],
            //       [103.57567457694688, -1.6154123989164617],
            //       [103.63624333965345, -1.6154123989164617],
            //       [103.63624333965345, -1.5538708282870601],
            //       [103.57567457694688, -1.5538708282870601],
            //     ],
            //   ],
            //   type: "Polygon",
            // };
        
            // Turn the geojson geometry to ee.Geometry for filtering earth engine collection
            // const geometry = ee.Geometry(geojson);
        
            // Range of date for filter
            // const start = "2023-05-01";
            // const end = "2023-07-31";
        
            // // Filter by date and bounds
            // const filtered = col.filterBounds(geometry).filterDate(start, end);
        
            // // Apply cloud masking
            // const cloudMasked = filtered.map((image) => {
            //   const scl = image.select("SCL");
            //   const mask = scl
            //     .eq(3)
            //     .or(scl.gte(7).and(scl.lte(10)))
            //     .eq(0);
            //   return image.select(["B.*"]).updateMask(mask);
            // });
        
            // // Create a median composite of the image
            // const median = cloudMasked.median();
            // const vis = {
            //   min: [1000, 500, 250],
            //   max: [4000, 3000, 2000],
            //   bands: ["B8", "B11", "B12"],
            // };
            // const imageGeom = filtered.geometry();
      
   
            
     
            // Chuyển đổI data thành ee.Dictionary
           var targetProvince = ProvinceFind.province
            console.log(targetProvince)
            // Tải dữ liệu bản đồ Việt Nam
            var vietnamProvinces = ee.FeatureCollection("FAO/GAUL/2015/level1")
                                      .filter(ee.Filter.eq('ADM0_NAME', 'Viet Nam'));
                       
            // Gán màu sắc cho từng tỉnh
            var coloredProvinces = vietnamProvinces.map(function(feature) {
              var provinceName = feature.get('ADM1_NAME'); 
          
              if(ratio >= 0.03 ){
                var color = ee.Algorithms.If(
                  ee.String(provinceName).equals(targetProvince),
                  'red', 
                  'blue' 
                );
              }
              
              if(ratio < 0.03){
                var color = ee.Algorithms.If(
                  ee.String(provinceName).equals(targetProvince),
                  'green', 
                  'blue' 
                );
              }
        
              
              return feature.set('style', { fillColor: color,width: 5,strokeColor:'000000',strokeWidth: 1});});
            
            
            // var propertiesList = coloredProvinces.map(function(feature) {
            //   var name = feature.get('ADM1_NAME'); 
            //   var style = feature.get('style'); 
            //   return feature.set('name', name).set('style', style);
            // });
  
  
            var vis = {
              min: 0,
              max: 400,
               
              };
   
           var imageGeom = vietnamProvinces.geometry();
         
           coloredProvinces.style({styleProperty: 'style'}).getMapId(vis, function(map,error) {
               error ? reject(new Error(error))   : 
               imageGeom.evaluate((result, error) =>
                error ? reject(new Error(error)) : res.json({
                   urlFormat:map.urlFormat,
                   geojson:result,
                   longitude:ProvinceFind.longitude,
                   latitude:ProvinceFind.latitude,
                   totalItems,
                   ratio,
                   performance,
                   level,
                   data:items,
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
  
    // const auth = new GoogleAuth({
    //   credentials: serviceAccountCredentials,
    //   scopes: ['https://www.googleapis.com/auth/earthengine.readonly'],
    // });
  
  
    // const client = await auth.getClient();
  
  
    // const accessToken = await client.getAccessToken();
    // await ee.data.authenticate(
    //   accessToken.token,
    //   () => {
    //     console.log('Authenticated successfully!');
    //   },
    //   (error) => {
    //     console.error('Authentication error:', error);
    //   }
    // );
    
    
   
  
   
    } catch (error) {
      console.error('Authentication error:', error);
      res.status(500).send('Authentication failed');
    }
  }
  exports.getApiNewDisaster = async(req,res)=>{
    key=process.env.service_account_key
   
    try {
      let data=await DisasterNew.find({ status: 'Ongoing' });
      // Đọc file JSON của Service Account
      const serviceAccountCredentials = JSON.parse(key);
    
      ee.data.authenticateViaPrivateKey(
        serviceAccountCredentials,
        () =>
          ee.initialize(
            null,
            null,
            function(){
              // Tải dữ liệu bản đồ Việt Nam
              var vietnamProvinces = ee.FeatureCollection("FAO/GAUL/2015/level1")
                                        .filter(ee.Filter.eq('ADM0_NAME', 'Viet Nam'));
              
              // Gán màu sắc cho từng tỉnh
              var coloredProvinces = vietnamProvinces.map(function(feature) {
               
                return feature.set('style', { fillColor:'red',width: 5,strokeColor:'000000',strokeWidth: 1});});
              
              var vis = {
                min: 0,
                max: 400,
                 
                };
     
             var imageGeom = vietnamProvinces.geometry();
             
             coloredProvinces.style({styleProperty: 'style'}).getMapId(vis, function(map,error) {
                 error ? reject(new Error(error))   : 
                 imageGeom.evaluate((result, error) =>
                   error ? reject(new Error(error)) : res.json({
                     urlFormat:map.urlFormat,
                     geojson:result,
                     data:data,
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
    
      // const auth = new GoogleAuth({
      //   credentials: serviceAccountCredentials,
      //   scopes: ['https://www.googleapis.com/auth/earthengine.readonly'],
      // });
    
    
      // const client = await auth.getClient();
    
    
      // const accessToken = await client.getAccessToken();
      // await ee.data.authenticate(
      //   accessToken.token,
      //   () => {
      //     console.log('Authenticated successfully!');
      //   },
      //   (error) => {
      //     console.error('Authentication error:', error);
      //   }
      // );
      
      
     
    
     
      } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).send('Authentication failed');
      }
  }
  exports.getApiGee = async (req, res) => {
   
  
    key=process.env.service_account_key
   
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
         
         
            // var data = {
            //   "Vinh Phuc": 5,
          
            
            //   // Thêm các tỉnh khác nếu cần
            // };
            
            // // Chuyển đổi data thành ee.Dictionary
            // var dataDict = ee.Dictionary(data);
            
            // Tải dữ liệu bản đồ Việt Nam
            var vietnamProvinces = ee.FeatureCollection("FAO/GAUL/2015/level1")
                                      .filter(ee.Filter.eq('ADM0_NAME', 'Viet Nam'));
            
                                    
          
          var imageCollection =ee.ImageCollection("COPERNICUS/S2_HARMONIZED")
          function  clouldMask(image){
            var qa = image.select('QA60')
            var bit10 = 1 <<10
            var bit11 = 1 << 11;
            var mask = qa.bitwiseAnd(bit10).eq(0).and( qa.bitwiseAnd(bit11).eq(0));
            return image.updateMask(mask);
          }
          
          var filterSentinel2A=imageCollection
          .filterDate('2020-01-15','2020-12-31')
          .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
          .map(clouldMask);
          var color843 = filterSentinel2A.select(['B4','B3','B2']).median();
          var color843Vis={
            band: ['B4','B3','B2'],
            min:0,
            max:2000,
          }
            // Gán màu sắc cho từng tỉnh
            // var coloredProvinces = vietnamProvinces.map(function(feature) {
            //   var provinceName = feature.get('ADM1_NAME'); 
            //   var color = ee.Algorithms.If(dataDict.contains(provinceName), '#FFCCCC', '#005EB8'); 
            //   return feature.set('style', { fillColor: color,width: 5,strokeColor:'000000',strokeWidth: 1});});
            
           var imageGeom = vietnamProvinces.geometry();
           
           color843.clip(vietnamProvinces).getMapId(color843Vis, function(map,error) {
               error ? reject(new Error(error))   : 
               imageGeom.evaluate((result, error) =>
                 error ? reject(new Error(error)) : res.json({
                   urlFormat:map.urlFormat,
                   geojson:result,
                 
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
  };