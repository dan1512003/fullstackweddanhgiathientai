const mongoose = require("mongoose")
const Schema =mongoose.Schema
const test = new Schema({
    disaster:{
        type:String,
        require:true,
    }
})
module.exports = mongoose.model('test',test)