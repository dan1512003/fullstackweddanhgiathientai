const mongoose= require('mongoose')
const Shema =mongoose.Schema
const DistrictShema = new Shema({
  
    districtdetail: {
       type:String,
        require:true
    },
    district: {
        type:String,
         require:true
     },
     idparent:{
        type:String,
        require:true
    },
   
    })
module.exports =mongoose.model('District',DistrictShema )
