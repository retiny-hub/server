const mongoose = require('mongoose');

const schema = new mongoose.Schema({
pub:String,
title:String,
description:String,
overView:String,
model:String,
type:String,
impactFactor:String,
impactYear:String,
submission:String,
downloads:String,
printISN:String,
electronicISN:String,
price:Number
},{timestamps:true})
module.exports = mongoose.model('Book',schema)