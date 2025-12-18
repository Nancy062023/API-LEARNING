const express = require("express");
const app = express();
const path =require("path");

const port = 8000;
 



//app.use(express.static("folder_name "));
app.use (express.static (path.join (__dirname, "public")));





app.set("view engine ","ejs");



//views directory set krna h
app.set ("views" , path.join(__dirname, "/views"));

 



app.get ("/" , (req,res) => {
    res.render ("home.ejs");
    //home.ejs  ek file h jisko import ni kiye h qki ejs me direct wo views folder k khojta h fr usme jo file hoti h usme se data leta h wo isle home.ejs direct me isme ps hua h  

 });


 

 //insta
app.get("/ig/:username" , (req,res) => {
   const followers = ["adam" , "eve" , "jack" , "jill"];
   let { username } = req.params;
   res.render("instagram.ejs", { username, followers });
});


 app.get ("/hello" , (req,res) => {
    res.send ("hello");
    

 });



//RollDice
app.get ("/rolldices" , (req,res) => {
   let diceVal = Math.floor (Math.random() * 6) + 1;
   res.render ("rolldices.ejs" , {diceVal} );
});






//PATCH
app.patch ("/posts/:id" , (req,res) => {
   let{id} = req.params;
   let newContent = req.body.content;
   console.log (newContent);
    res.send ("patch req received");
 }); 







 app.listen(port , () =>{
    console.log (`listen on port ${port}`);

 });



