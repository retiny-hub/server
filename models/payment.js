const mongoose = require('mongoose');

const schema = new mongoose.Schema({
item:String,
payer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
},
date:{
    type:Date,
    default:Date.now
}
},{timestamps:true})
module.exports = mongoose.model('Payment',schema)