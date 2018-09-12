const mongoose = require("mongoose");
const moment = require('moment');
const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    title: { type: String, required: true },
    noteCours: { type: String, required: true },
    topic: { type: String },
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    noteFile: {
      type: String
    }
  },
  {
    timestamps: true
  }
);


noteSchema.virtual("created").get(function(){
  return moment(this.createdAt).locale('fr').fromNow();
});

noteSchema.virtual("updated").get(function(){
  return moment(this.updatedAt).locale('fr').fromNow();
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
