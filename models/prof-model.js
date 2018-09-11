const mongoose= require('mongoose');
const Schema = mongoose.Schema;


const profSchema = new Schema (
  {
    lastName: { type: "String", require: true },
    firstName: { type: "String", require: true },
    numéro: { type: 'String', require: true, match: /^(?:(?:\+|00)33|0)\s*[6-7](?:[\s.-]*\d{2}){4}$/},
    email: { type: 'String', require:true, match: /^.+@.+\..+$/ },
    encryptedPassword: { type: 'String',  }
},{
  timestamps: true
}
);

const Prof = mongoose.model("User", profSchema);


module.exports = Prof;