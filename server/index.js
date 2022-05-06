// const express = require('express');

const express = require("express");
const mongoose = require("./model/script");
const mongodb = require("mongodb");
const app = express();
const port = 4003;

app.use(express.json());
app.use(express.urlencoded({ extended: "false" }));

app.post("/get-form-list", async (req, res) => {
  try {
    const { name, surname, food, time, attending } = req.body;
    if (
      name === "" ||
      surname === "" ||
      food === [""] ||
      time === Number ||
      attending === Boolean
    ) {
      return res.send(400);
    }
    const UserDetails = new mongoose({ name, surname, food, time, attending });
    console.log(UserDetails);
    res.send(UserDetails);
    const capturedValues = await UserDetails.save()
    console.log('capturedValues', capturedValues)
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.get('/get-form-list/',async (req,res)=>{
  try{
    const attenders = await mongoose.find()
    console.log('attenders', attenders)
    res.send(attenders)
  }catch(error){
    console.log(error)
    res.send(404)
  }
})

app.delete('/get-form-list/:id', async (req, res)=>{
  try{
    const {id} = req.params
    const attendees = await mongoose.deleteOne({_id: id})
    console.log('attendees', attendees)
    res.send(attendees)
  }catch(error){
    console.log(error)
    res.send(404)
  }
})

app.put('/get-form-list/:id', async (req,res)=>{
  const { id } = req.params
  const {food, time, attending} = req.body
  try{
    const foundAttendee = await mongoose.findOneAndUpdate({_id: `${id}`}, {food, time, attending})
    console.log('foundAttendee', foundAttendee)
    res.send(foundAttendee)
  }catch(error){
    console.log(error)
    res.send(404)
  }
})

app.listen(port, () => {
  console.log(`listening on port${port}`);
});
