const mongoose = require("mongoose");
// i bring mongoose module here by using require method.
const Schema = mongoose.Schema;
// I am using schema property of mongoose, so i assigned it as value called schema.

const messageSchema = new Schema({
  fullname: {
    type: String,
  },
  email: {
    type: String,
  },
  message: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
// after creating first schema. now i used new Schema variable. it has object. and i create collection. in form version, when i receive data, it should be defined.

module.exports = mongoose.model("Message", messageSchema);
// i use model.export to store collection and to able to access to collection.
//
