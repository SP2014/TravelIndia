var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Spots',{
    loc_name:String,
    loc_fullname:String,
    loc_coordinates:String,
    loc_description:String,
    loc_category:[String],
    loc_rating:{type: Number, min: 0, max: 5},
    loc_city:String,
    loc_state:String,
    media:[String],
    postUserId:String,
    timestamp: String,
    shared_data:String,
    keywords:String
});