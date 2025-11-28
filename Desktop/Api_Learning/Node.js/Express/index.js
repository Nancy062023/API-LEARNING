const express= require("express");
const app = express();

console.dir (app);
let port = 8080;
app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});

//USE
// app.use((req,res) => {
    // console.log(req);
    // console.log("request received");
    // res.send({
    //     name:"apple",
    //     color:"red",

    // });
    // let code = "<h1>Fruits</h1><ul><li>apple</li><li>orange</li></ul>"
// app.use((req,res) => {
//     console.log(req);
//     console.log("request received");
 
//     let code = "<h1>Fruits</h1><ul><li>apple</li><li>orange</li></ul>";


// res.send(code);






// GET 
app.get("/apple", (req, res) => {
    res.send("you contacted an apple path");
});

app.get("/mango", (req, res) => {
    res.send("You contacted a mango path");
});

// Catch-all route (Express v5 compatible)
app.use((req, res) => {
    res.status(404).send("this path doesn't exist");
});


app.get ("/:username/:id", (req,res) => {
    let{username,id}= req.params;
    res.send (`welcome @${username}.`);
});

