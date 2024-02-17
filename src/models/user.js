const mongoose = require('mongoose');

const attachmentSchema = new mongoose.Schema({
    filename: String,
    filePath: String,
    filesize: String,
  });

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    userType:{
        type:String,
        default:"user"
    },
    profileImage: attachmentSchema,
    attachments:[attachmentSchema],
});

module.exports = mongoose.model('User', userSchema);