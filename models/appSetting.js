const mongoose = require('mongoose')
const appSettingsSchema = new mongoose.Schema({
    name:String,
    userRegistration:{
        type:Boolean,
        default:true
    },
    premiumCost:Number,
    supports:[],
    helped:[],
    newsletters:[],
    help:String,
    newsletterSubscribers:[],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },
        phone:{
            type:Number
        },
    deletedUsers:[],
    deletedAdmins:[],
    subsrciptions:[],
    currency:{type:String},
    reports:[]
})
module.exports = mongoose.model('AppSetting',appSettingsSchema)