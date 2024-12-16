const moogoose = require('mongoose')
const Schema    =moogoose.Schema
const TypeDisasterSchema= new Schema({
    disaster:{
        type: String,
        require:true,
    },
})
module.exports =moogoose.model('Type Disaster',TypeDisasterSchema)