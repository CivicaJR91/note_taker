// ===============================================================================
// LOAD DATA
//Linking routes to the db.json file
// db.json file will contains the data


const notesData = require("../db/db.json");
const { report, title } = require("process");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const { text } = require("express");
const noteId = uuidv4();
const path = require("path");

// ===============================================================================
// ROUTING APIS
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Requesting data from db.json file when a user visit the notes page
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function (req, res) {
 
    res.json(notesData); //response to /db/db.json
  
  });

  // API POST Requests
  // ---------------------------------------------------------------------------

  app.post("/api/notes", function (req, res) {

    const createNewNotes = {
      title: req.body.title,
      text: req.body.text,
      id: noteId
    }
    console.log(createNewNotes);
    
    const database_Dir = path.resolve (__dirname,"../db"); //director path to the file
    const outputData = path.join (database_Dir,"db.json");
     
    // Saving the Data 
    fs.readFile(path.join(outputData), 'utf8', function (err, data) {
      if (err) throw err

      const dbnotes = JSON.parse(data);
      
      dbnotes.push(createNewNotes);
      

      
      fs.writeFile(outputData, JSON.stringify(dbnotes), 'utf8', function(err) {
        if (err) throw err
        
        console.log("Data Was Retreive");

        // res.json(dbnotes);// response should be the new data
        res.send(dbnotes);

      });

    });
    
  });

  //Deleting Data and then re write the file

  // app.delete('/api/notes/:id', function(req, res) {

  //     // const deleteId = req.params.id
  //     // //filter the array by the id

  //     res.send(dbnotes);

  // })

};


