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

     // Saving the Data 
    fs.readFile(path.join(__dirname,"../db","db.json"), 'utf8', function (err, data) {
      if (err) throw err

      const dbnotes= JSON.parse(data); // data on the db

      dbnotes.push(createNewNotes);//passing new data to db.json file

      console.log(data);
      res.json(true);
    

       //Retreaving the data
       const database_Dir = path.resolve (__dirname,"../db"); //directory where database is
       const outputData = path.join (database_Dir,"db.json"); //database file
    
       fs.writeFile(outputData, JSON.stringify(dbnotes), 'utf8', function(err){
           if (err) 
           console.log(err);
  
           console.log("Data Was Retreive")
         } )

    });

  });

 

  //Delete

  // app.delete("/api/notes", function(req, res){
  //   //add here
  //   res.send("Delete Request")

  // })



};
