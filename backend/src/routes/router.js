const express = require('express');
const districtController=require('../controller/district')
const userController =require('../controller/user')
const countryController=require('../controller/country')
const newController=require('../controller/new')
const typeDisasterController=require('../controller/typedisaster')
const newDisasterController=require('../controller/disasternew')
const GeeController =require('../controller/apigee')
const  Country= require('../model/country')
const multer = require('multer');
const country = require('../model/country')
const upload=multer()
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()
const fs =require('fs');
const {  GoogleAuth } = require('google-auth-library');
const uploadDir = 'src/upload';
var ee =require('@google/earthengine');
const { rejects } = require('assert');

require('dotenv').config();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
   
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir); 
    }

      cb(null, uploadDir); 
  },
  filename: function (req, file, cb) {
      cb(null, file.fieldname+"_"+Date.now() +"_"+file.originalname); 
  }
});


var uploads = multer({
  storage:storage,
}).single("img")

const upload2 = multer({
storage:storage,
}).single("upload")

const router =express.Router();
router.post('/uploaded',upload2,(req,res)=>{
let url=`/upload/${req.file.filename}`
let mgs='upload  successfully'
let funcNum=req.query.CKEditorFuncNum;
console.log(url)

res.status(201).send("<script>window.parent.CKEDITOR.tools.callFunction('"+funcNum+"','"+url+"','"+mgs+"');</script>")
})

router.get("/",async(req,res)=>{
  
  try{

    const page = parseInt(req.query.page) || 1;
    const limit = 3;
    const skip = (page - 1) * limit;
    const items = await Country.find().skip(skip).limit(limit);
    const totalItems = await Country.countDocuments();
    const totalPages = Math.ceil(totalItems / limit);

res.render("app",{
   title:"Home page",
   items:items,
   currentPage: page,
   totalPages: totalPages,
   skip:skip,
})
  }catch(err){

  }
   
})


router.get('/api', async (req, res) => {
  res.send('ok')
  });
  router.get('/api/authenticate', async (req, res) => {
   
  
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
         
         
            var data = {
              "Vinh Phuc": 5,
          
            
              // Thêm các tỉnh khác nếu cần
            };
            
            // Chuyển đổi data thành ee.Dictionary
            var dataDict = ee.Dictionary(data);
            
            // Tải dữ liệu bản đồ Việt Nam
            var vietnamProvinces = ee.FeatureCollection("FAO/GAUL/2015/level1")
                                      .filter(ee.Filter.eq('ADM0_NAME', 'Viet Nam'));
            
            // Gán màu sắc cho từng tỉnh
            var coloredProvinces = vietnamProvinces.map(function(feature) {
              var provinceName = feature.get('ADM1_NAME'); 
              var color = ee.Algorithms.If(dataDict.contains(provinceName), '#FFCCCC', '#005EB8'); 
              return feature.set('style', { fillColor: color,width:0,strokeColor:'000000',strokeWidth: 1});});
            
            
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
  });
router.get("/getuser",userController.getUser)
router.get("/signin",userController.getSignIn)
router.post("/signin",upload.none(),userController.postSignIn)
router.get("/signup",userController.getSignUp)
router.post("/signup",upload.none(),userController.postSignUp)
router.get("/sendmail",userController.getSendMail)
router.get("/fogotpassword",userController.getFogotPassword)
router.post("/fogotpassword",upload.none(),userController.postFogotPassword)

router.get("/apigeedisaster",GeeController.getApiGee)
router.get("/getapicoordinates",countryController.getApiCoordinates)
router.get("/getapigeenewdisaster",GeeController.getApiNewDisaster)
router.get("/getapianalysis",GeeController.getApiAnalysis)
router.get("/getapiautocomplete",countryController.getApiAutoComplete)
router.get("/getapicountry",countryController.getApiCountry)
router.get("/getcountry",countryController.getCountry)
router.get("/postcountry",countryController.getPostCountry)
router.post("/postcountry",upload.none() ,countryController.postCountry)
router.get("/deletecountry/:id",countryController.deleteCountry)
router.get("/updatecountry/:id",countryController.getUpdateCountry)
router.post("/updatecountry/:id",upload.none(),countryController.updateCountry)

router.post("/getapidistrict",districtController.getApiDistrict)
router.get("/getdistrict/:id",districtController.getCountry)
router.get("/postdistrict/:id",districtController.getPostCountry)
router.post("/postdistrict",upload.none() ,districtController.postCountry)
router.get("/deletedistrict/:id",districtController.deleteCountry)
router.get("/updatedistrict/:id",districtController.getUpdateCountry)
router.post("/updatedistrict/:id",upload.none(),districtController.updateCountry)

router.get("/getapitypedisaster",typeDisasterController.getApiTypeDisaster)
router.get("/gettypedisaster",typeDisasterController.getTypeDisaster)
router.get("/posttypedisaster",typeDisasterController.getPostTypeDisaster)
router.post("/posttypedisaster",upload.none(),typeDisasterController.postTypeDisaster)
router.get("/deletetypedisaster/:id",typeDisasterController.deleteTypeDisaster)
router.get("/updatetypedisaster/:id",typeDisasterController.getUpdateTypheDisaster)
router.post("/updatetypedisaster/:id",upload.none(),typeDisasterController.updateTypeDisaster)


router.get("/getapilandslide",newDisasterController.getApiLandslide)
router.get("/getapiflood",newDisasterController.getApiFlood)
router.get("/getapiearthquake",newDisasterController.getApiEarthQuake)
router.get("/getapityphoon",newDisasterController.getApiTyphoon)
router.get("/getapidrought",newDisasterController.getApiDrought)
router.get("/getapisaltwaterintrusion",newDisasterController.getApiSaltwaterIntrusion)
router.get("/getapinamenewdisaster",newDisasterController.getApinameNewDisaster)
router.get("/getapiidnewdisaster/:id",newDisasterController.getApiIdNewDisaster)
router.get("/getapifilternewdisaster",newDisasterController.getApiFilterNewDisaster)
router.get("/getapinewdisaster",newDisasterController.getApiNewDisaster)
router.get("/getnewdisaster",newDisasterController.getNewDisaster)
router.get("/postnewdisaster",newDisasterController.getPostNewDisaster)
router.post("/postnewdisaster",uploads,newDisasterController.postNewDisaster)
router.get("/deletenewdisaster/:id",newDisasterController.deleteNewDisaster)
router.get("/updatenewdisaster/:id",newDisasterController.getUpdateNewDisaster)
router.post("/updatenewdisaster/:id",uploads,newDisasterController.updateNewDisaster)


router.get("/getapifilternew",newController.getApiFilterNew)
router.get("/getapinamenew",newController.getApinameNew)
router.get("/getapiidnew/:id",newController.getApiIdNew)
router.get("/getapinew",newController.getApiNew)
router.get("/getnew",newController.getNew)
router.get("/postnew",newController.getPostNew)
router.post("/postnew",uploads,newController.postNew)
router.get("/deletenew/:id",newController.deleteNew)
router.get("/updatenew/:id",newController.getUpdateNew)
router.post("/updatenew/:id",uploads,newController.updateNew)


module.exports = router;