'use strict';

// load package
const express = require('express');
const bodyParser = require("body-parser");
const fs = require('fs');
const { time } = require('console');


const PORT = 8080;
const HOST = '0.0.0.0';
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));




app.get('/', (req, res) => {
    res.redirect("/posting.html");
})




app.get('/getpost', (req,res) => {


    fs.readFile('pages/posts.txt', 'utf-8', (err, data) => {

        if (err) {
          console.error(err);
          return;
        }
        res.send(data);

      });
});





app.post('/postmessage', (req,res) => {

    var topic = req.body.topic;
    var data = req.body.data;
    const timestamp = new Date().toLocaleString();

    console.log(topic);
    console.log(data);
    console.log(timestamp);

    var obj_data = new Object();
    obj_data.topic = topic;
    obj_data.data = data;
    obj_data.timestamp = timestamp;

    const post = `${timestamp} | Topic: ${topic} | Data: ${data}\n`;

    var json_data = JSON.stringify(obj_data);


    fs.appendFile('pages/posts.txt', json_data , err => {

        if (err) {
            console.error(err)
            return
        }
        //res.send("FILE MADE");
    });

    fs.readFile('pages/posts.txt', 'utf-8', (err, data) => {

        if (err) {
          console.error(err);
          return;
        }
        res.send(data);

      });
});




app.use('/', express.static('pages'));



app.listen(PORT, HOST);
console.log('up and running');