const express = require('express');
const app = express();
const path = require('path');
const { spawn } = require('child_process');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Existing routes...


// ...existing code...

var bodyParser = require("body-parser");
// const cv2 = require('opencv4nodejs');
// var NodeWebcam = require( "node-webcam" );
const request = require('request');



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const url_PaperMinecraft = "https://scratch.mit.edu/projects/10128407/embed"
const url_TurboWarpKart = "https://scratch.mit.edu/projects/768298770/embed"
const url_SnakeGameExtreme = "https://scratch.mit.edu/projects/487258179/embed"
var url_send=""
gameName=""

app.get("/", function (req, res) {
 
    res.render("index");
    
});

app.post("/", function (req, res) {

    console.log(req.body);
    var play=req.body.play;

    if(play=="yes"){
       
        // console.log("hi")
        res.redirect("/yoga")
    }        

})


app.get("/yoga", function (req, res) {
 
    // console.log("hi pt2")
    res.render("yoga");
    
});


app.get("/games", function (req, res) {
 
    res.render("games");

});

app.post("/games", function (req, res) {
    
    console.log(req.body);
    var gameName=req.body.gameName;
    
    if(gameName=="endless-runner-1"){
        url_send=url_PaperMinecraft;
        res.redirect("/play")
    } 
    else if(gameName=="endless-runner-2"){
        url_send=url_TurboWarpKart;
        res.redirect("/play")
    }
    else if(gameName=="endless-runner-3"){
        url_send=url_SnakeGameExtreme;
        res.redirect("/play")
    }

})



app.get("/play", function (req, res) {
 
    // const Vcap = new cv2.VideoCapture(0);
    
    // request('http://localhost:5000/flask', function (error, response, body) {
    //     console.error('error:', error); // Print the error
    //     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //     console.log('body:', body); // Print the data received
    //     // res.send(body); //Display the response on the website
    //   });
    
    // var Webcam = NodeWebcam.create({});
    res.render("play",{gameSrc:url_send});
    
});


// Route to start yoga exercise
app.post('/start-yoga', (req, res) => {
    const pythonProcess = spawn('python', [path.join(__dirname, 'yoga_final', 'code.py')]);
    let completed = false;

    pythonProcess.stdout.on('data', (data) => {
        // Check for completion message from code.py
        if (data.toString().includes('unlocked the game')) {
            completed = true;
        }
    });

    pythonProcess.on('close', (code) => {
        if (completed) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    });
});

    app.listen(process.env.PORT || 3000, function () {
        
    console.log("Server is up and running on port 3000");
    
});

