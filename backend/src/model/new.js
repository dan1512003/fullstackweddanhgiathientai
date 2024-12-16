const mongoose = require('mongoose')
const Schema = mongoose.Schema
const New = new Schema({
    province:{
        type:String,
        require:true,
    },
    region:{
        type:String,
        require:true,
    },
    disaster:{
        type:String,
        reqruire:true,
    },
    datepost:{
        type:String,
        require:true,
    },
    img:{
        type:String,
        require:true,
    },
    title:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    content:{
        type:String,
        require:true,
    },
})

module.exports =mongoose.model('New',New)