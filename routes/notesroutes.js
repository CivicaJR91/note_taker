
const notesData = require("../db/db.json");
const { report, title } = require("process");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const { text } = require("express");

const path = require("path");

const database_Dir = path.resolve(__dirname, "../db"); //director path to the file
const outputData = path.join(database_Dir, "db.json");



// ROUTING APIS

module.exports = function (app) {

  app.get("/api/notes", function (req, res) {
   

    fs.readFile(path.join(outputData), 'utf8', function (err, data) {
      if (err) throw err

      res.json(JSON.parse(data));
    });

  });

  // API POST Requests
 
  app.post("/api/notes", function (req, res) {
    
    const uniqID = uuidv4();

    const createNewNotes = {
      title: req.body.title,
      text: req.body.text,
      id: uniqID
    }
    console.log(createNewNotes);

    // Saving the Data 
    fs.readFile(path.join(outputData), 'utf8', function (err, data) {
      if (err) throw err

      const dbnotes = JSON.parse(data);

      dbnotes.push(createNewNotes);

      fs.writeFile(outputData, JSON.stringify(dbnotes), 'utf8', function (err) {
        if (err) throw err
        res.send(dbnotes);

      });

    });

    //until here IDs are been creating and passing as unique
  });

  //Deleting Data and then re write the file

  app.delete('/api/notes/:id', function (req, res) { 
    const deleteId = req.params.id
    console.log(deleteId);

    //After delete id read data in file

    fs.readFile(outputData, 'utf8', function (err, data) {
      if (err) throw err
     
    
      const dbnotes = JSON.parse(data);

      const deleteNotes = dbnotes.filter( note => note.id != deleteId);
      console.log(deleteNotes);

      // until here ids are unique
      //Write file again

      fs.writeFile(outputData, JSON.stringify(deleteNotes), 'utf8', function (err) {
        if (err) throw err

        console.log("After delete");

        res.send(dbnotes);

      });
    });

  });

};


