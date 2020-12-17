//Dependencies

var express = require("express");

// EXPRESS CONFIGURATION
// Tells node what app we are using
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT ||3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use (express.static('public'));

// ROUTER
// What Routes Are We Using 

require("./routes/htmlroutes")(app);
require("./routes/notesroutes")(app);


// The below code effectively "starts" our server


app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
