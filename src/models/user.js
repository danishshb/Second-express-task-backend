const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: false 
    },
    files: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File'
      }],
    filename: { type: String },
    filePath: { type: String },
    filesize: { type: Number },
  });

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
    folders:[folderSchema],
});

module.exports = mongoose.model('User', userSchema);