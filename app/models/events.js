/**
 * Created by Aashish on 3/2/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Events',{
    event_name:String,
    event_description:String,
    event_category:[String],
    spot_id:String,
    event_contact: Number,
    image:Schema.Types.Mixed,
    media:Schema.Types.Mixed,
    postUserId:String,
    timestamp: { type: Date, default: Date.now },
    shared_data:String,
});
