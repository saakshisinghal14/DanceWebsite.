const express= require("express");
const path=require("path");

const app =express();
// getting-started.js
const mongoose = require('mongoose');
const bodyparser=require("body-parser");

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost/contactDance');
}
const port=8000;
//define mongoose schema
const contactSchema = new mongoose.Schema({
      name: String,
      number: String,
      email: String,
      address: String,
      desc: String
    });
    const Contact = mongoose.model('Contact', contactSchema);

//express specific
app.use("/static",express.static("static"));
app.use(express.urlencoded({extended: true}));

// Pug specific
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

//End Points
app.get('/',(req,res)=>{
  
      const  params= {};
//    res.status(200).render("index.pug",params);
   res.status(200).render("home.pug",params);
   });

app.get('/contact',(req,res)=>{
  
      const  params= {};
//    res.status(200).render("index.pug",params);
   res.status(200).render("contact.pug",params);
   });
   //important
app.post('/contact',(req,res)=>{
  
    var myData=new Contact(req.body);
    //promise
    myData.save().then(()=>{
          res.send("this item has been saved to the database")
    }).catch(()=>{
          res.status(400).send("Item was not save to the database")
    });
//    res.status(200).render("contact.pug");
   });
   
  
   
   //START THE SERVER
   app.listen(port,()=>{
       console.log(`The application started successfully on port ${port}`);
   });