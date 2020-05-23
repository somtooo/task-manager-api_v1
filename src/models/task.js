const mongoose = require('mongoose');

const Task = new mongoose.model('Task',{
    description:{
        type:String,
        trim:true,
        required:true
    },
    completed:{
        type:Boolean,
        default: false
    },
    owner:{
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref:'User'
    }
});

module.exports = Task;