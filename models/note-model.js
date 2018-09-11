const mongoose = require ('mongoose');

const Schema = mongoose.Schema;


const noteSchema = new Schema({
  title: {type: 'String', required: true},
  noteCours: {type: 'String', required: true},
  topic: { type: 'String'}
});


const Note = mongoose.model("Note", noteSchema);

module.exports = Note;