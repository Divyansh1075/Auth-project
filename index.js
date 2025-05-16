const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();


app.use(express.json());
app.use(express.static("./public"));
app.use(cors());


const users = [];
const JWT_SECRET = "USER_APP";


app.post("/signup", (req, res) => {
    const { username, password } = req.body;

    users.push({ username, password }); 
    res.json({"message": "Task done!"});
    alert("Signed Up")

});


app.post("/signin", (req, res) => {
    const { username, password } = req.body; 

    const user = users.find(user => user.username === username && user.password === password);

    if(user){
        const token = jwt.sign({
            username: user.username,
        }, JWT_SECRET);

        user.token = token; 

        res.json({
            token
        });
        alert("Signed In")
        
    }else{
        res.status(404).json({
            message: "Invalid username or password"
        });
    }
});


app.get("/me", (req, res) => {
    console.log("1");

    const authHeader = req.headers.authorization;

    const token = authHeader.split(" ")[1];
    console.log("2");

    const userdetails = jwt.verify(token, JWT_SECRET);
    const username = userdetails.username;

    const user = users.find(user => user.username === username);

    if (user) {
        res.json({
            username: user.username
        });
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
});


app.listen(3000);
