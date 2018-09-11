const mongoose= require('mongoose');
const Schema = mongoose.Schema;


const profSchema = new Schema (
  {
    lastName: { type: "String", require: true },
    firstName: { type: "String", require: true },
    number: { type: 'String', require: true, match: /^(?:(?:\+|00)33|0)\s*[6-7](?:[\s.-]*\d{2}){4}$/},
    email: { type: 'String', require:true, match: /^.+@.+\..+$/ },
    encryptedPassword: { type: 'String' },
    role: { type:'String', enum: [ 'normal', 'admin', 'prof'], required: true }
},{
  timestamps: true
}
);

const Prof = mongoose.model("User", profSchema);


module.exports = Prof;