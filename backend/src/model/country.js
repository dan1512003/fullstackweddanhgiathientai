const mongoose= require('mongoose')
const Shema =mongoose.Schema
const CountryShema = new Shema({
    provincedetail: {
       type:String,
        require:true
    },
    province: {
        type:String,
         require:true
     },
   
   
    })
module.exports =mongoose.model('Country',CountryShema)
