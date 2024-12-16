const mongoose = require('mongoose')
const Schema   = mongoose.Schema
const NewDisaster= new Schema({
disaster:{
    type:String,
    require:true,
},
province:{
    type:String,
    require:true,
},
district:{
    type:String,
    require:true,
},
title:{
    type:String,
    require:true,
},
icon:{
    type:String,
    require:true,
},
description:{
    type:String,
    require:true,
},
startdate:{
    type:Date,
    require:true,
},
enddate:{
    type:Date,
    require:true,
},
status:{
    type:String,
    require:true,
},
coordinate:[
    {
        latitude:  { type: String, required: true },
        longitude: { type: String, required: true },
        district:  {type:String,require:true},
        province:  {type:String,require:true}
    }
],
 region:{
    type:String,
    require:true,
},
scope:{
    type:String,
    require:true,
}
})
module.exports = mongoose.model('DisasterNew', NewDisaster)