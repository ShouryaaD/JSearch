const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
     password: {
        type: String,
        required: true
    },
    isRecruiter: {
        type: Boolean,
        default: false,
        required: 'true'
    },

    skillsets: [{
        type: String, 
    }],
   
    associatedPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'Feed',
    }]

})

module.exports = mongoose.model('User', userSchema);