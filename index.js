// const express = require('express');
// const app = express();
// const port = 3000;
// const path = require('path');


// isko likhte h express ko smjhne ke lye json ke format ko shi krta h ye (middleware use krna hota h parse krne k lye)
// app.use(express.urlencoded({ extended: true }));



// app.set('view engine', 'ejs');  
// app.set('views', path.join(__dirname, 'views'));                


// app.set(express.static(path.join(__dirname, 'public')));

// app.get("/posts", (req, res) => {
//     res.render("index.ejs", { posts });
// });






// app.patch ("/posts/:id" , (req,res) => {
//    let{id} = req.params;
//    let newContent = req.body.content;
//    console.log (newContent);
//     res.send ("patch req received");
//  }); 


// app.listen (port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });







const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const port = 3000;

let posts = [
    { id: 1, user: "Rohit", content: "Hello world!" },
    { id: 2, user: "Amit", content: "Express + EJS is awesome!" },
    { id: 3, user: "Sneha", content: "I love coding ❤️" },
    {id:4, user:"anjali", content :"Learning new things every day!"},
    {id:5, user:"vikash", content: "Exploring new technologies!"}
];

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));




app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));




// ⭐ 1. Read All
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});



// ⭐ 2. New Post Form
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});





// ⭐ 3. Create Post
app.post("/posts", (req, res) => {
    let { user, content } = req.body;
    let id = posts.length + 1;
    posts.push({ id, user, content });
    res.redirect("/posts");
});




// ⭐ 4. Show One Post
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find(p => p.id === parseInt(id));
    res.render("show.ejs", { post });
});



// ⭐ 5. Edit Post Form
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find(p => p.id === parseInt(id));
    res.render("edit.ejs", { post });
});



// ⭐ 6. Update POST
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find(p => p.id === parseInt(id));
    post.content = newContent;
    res.redirect("/posts");
});




// ⭐ 7. Delete POST
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter(p => p.id !== parseInt(id));
    res.redirect("/posts");
});















app.listen(port, () => {
    console.log(`Server Running on http://localhost:${port}`);
});

