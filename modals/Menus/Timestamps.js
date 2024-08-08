const mongoose = require('mongoose');
const { Schema } = mongoose;



const TimestampSchema = new Schema({
  url: String,
},
{ timestamps: true }

);

module.exports = mongoose.model('Timestamp', TimestampSchema);
