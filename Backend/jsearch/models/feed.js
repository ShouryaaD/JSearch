const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
     timeReq: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'true'
    },
    applied:  [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        
    }],
    
    skillsets: [{
        type: String, 
    }],
     

})

module.exports = mongoose.model('Feed', feedSchema);