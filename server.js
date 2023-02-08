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





// app.post('/postmessage', (req,res) => {

//     const timestamp = new Date().toLocaleString();

//     var obj_data = new Object();
//     obj_data.topic = req.body.topic;;
//     obj_data.data = req.body.data;
//     obj_data.timestamp = timestamp;

//     //const post = `${timestamp} | Topic: ${topic} | Data: ${data}\n`;

//     var json_data = JSON.stringify(obj_data);


//     fs.appendFile('pages/posts.txt', json_data , err => {

//         if (err) {
//             console.error(err)
//             res.send(err);
//             return
//         }
//         res.send("POSTED SUCCESFULLY");
//     });
// });


app.post('/postmessage', (req, res) => {

    const timestamp = new Date().toLocaleString();
    const topic = req.body.topic;
    const data = req.body.data;


    const filePath = 'pages/posts.txt';


    // make the file if doesnt exists and make it ready to put data in JSON format
    if (!fs.existsSync(filePath)) {
        fs.writeFile(filePath, '[]', 'utf-8', (writeErr) => {
            if (writeErr) {
                console.error(writeErr);
                return res.send(writeErr);
            }
        });
    }


    // get the data from file
    fs.readFile(filePath, 'utf-8', (readErr, fileContents) => {

        let existingData = [];
        try {
            existingData = JSON.parse(fileContents);   // existing data in json format
        } catch (parseErr) {
            console.error(parseErr);
        }

        // append the data to list ensuring json validated format
        existingData.push({ topic, data, timestamp });
        const updatedData = JSON.stringify(existingData);


        // append the data to file
        fs.writeFile(filePath, updatedData, 'utf-8', (writeErr) => {
            if (writeErr) {
                console.error(writeErr);
                return res.send(writeErr);
            }

            return res.send('POSTED SUCCESSFULLY');
        });
    });
});


app.use('/', express.static('pages'));


app.listen(PORT, HOST);
console.log('up and running');