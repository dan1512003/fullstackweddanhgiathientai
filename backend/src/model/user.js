const moogoose = require('mongoose')
const Schema = moogoose.Schema
const User = new Schema ({
   username:{
    type:String,
    require:true,
   },
   gmail:{
    type:String,
    require:true,
   },
   password:{
    type:String,
    require:true,
   },

})
module.exports = moogoose.model('User',User)
