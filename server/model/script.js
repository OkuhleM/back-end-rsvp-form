require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(res=>console.log(
  '("I am connected to mongodb")')).catch(err=>console.log(err));
console.log('process.env.MONGO_URI', process.env.MONGO_URI)
const attendingGuestsList = mongoose.Schema({
name:{
    type: 'string',
    required: true
},

surname:{
    type: 'string',
    required: true
},
food:{
    type: [],
    required: true
},
time:{
    type: Number,
    
},
attending:{
  type: Boolean
}
})


module.exports = mongoose.model('attenders' , attendingGuestsList)