const mongoose = require('mongoose');


const folderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  files: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File'
  }],
    filename: { type: String },
    filePath: { type: String },
    filesize: { type: Number },
});

// Create a model based on the schema
const Folder = mongoose.model('Folder', folderSchema);

module.exports = Folder;
