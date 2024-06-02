
const fs = require("fs");
const path = require("path")
const express = require("express");
const app = express();

app.use(express.urlencoded({extended: true}));

const coronaData = require("./coronaData.json");
const activities = require("./activity.json")

app.get("/", function(req, res){
    res.sendfile( path.join(__dirname, "index.html") );
})

app.post("/autumn", function(req, res){
    console.log(req.body.activity)
    fs.writeFile(path.join(__dirname ,"data.txt"), req.body.activity, (err)=>{
        if(err){
            res.send(err);
        }else{
            res.send("処理完了")
        }
        
    })
})

app.post("/update", function(req, res){
    activities[0].activity = req.body.updateActivity;
    res.send(activities);
})

app.post("/delete", function(req, res){
    activities.splice(req.body.number, 1);
    res.send(activities);
})

const port = process.env.port || 5000;

app.listen(5000, function(){
    console.log(`listening on localhost  port ${port}`);
})
