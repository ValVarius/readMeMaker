var fs = require("fs");
var inquirer = require("inquirer");
const axios = require("axios");


inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "What is the name of your project?"
    },
    {
      type: "input",
      name: "github",
      message: "What is your name on GitHub?"
    },
    {
      type: "input",
      message: "Would you like to add a table of contents? Then Enter a list of contents each separated by comma:Example(description,installation,etc)",
      name: "table"
    },
    {
      type: "input",
      name: "description",
      message: "Add a description of your project:"
    },
    {
      type: "input",
      name: "label",
      message: "Enter a label for your badge:"
    },
    {
      type: "input",
      name: "message",
      message: "Enter a message for your badge:"
    },
    {
      type: "input",
      name: "color",
      message: "Enter a color for your badge:"
    }
    
  ]).then(function(data) {
  
    var gitUrl = "https://api.github.com/users/"+ data.github;

    var filename = data.projectName.toUpperCase().split(' ').join('') + ".md";

    axios
  .get(gitUrl)
  .then(function(res) {
    // inserts the profile picture
    fs.writeFile(filename, "![alt text](" + res.data.avatar_url + ")", function(err) {
        if (err) {
          return console.log(err);
        }
      })
      // Adds the project Title
      fs.appendFile(filename,"\n"+ "# "+ data.projectName.toUpperCase().split(' ').join(''), function(err) { 
        if (err) {
          return console.log(err);
        }
      });
      // if user chose to add a table of contents, it prompts for the needed data and then adds table to file
      if(!data.table=='undefined')
      {
          let list = data.table.toUpperCase().split(",");
          for (let i = 0; i < list.length; i++) {
            fs.appendFile(filename, "\n"+ "* " + list[i], function(err) {
              if (err) 
              {
                return console.log(err);
              }
            })
            
          }
          // end of for loop
          
      };
      // adds badge to file
          var badge = "\n"+ "https://img.shields.io/static/v1?label="+ data.label +"&message="+ data.message +"&color="+ data.color;
    if (!data.label=='undefined'){

          fs.appendFile(filename,badge,function(err) {
            if (err) {
              return console.log(err);
            }
          
  })
  }    
  // end of if
      //  Adds description
      fs.appendFile(filename, "\n"+ "```" + data.description.toLowerCase() + "```", function(err) {
        if (err) {
          return console.log(err);
        }
      })
    
    })
  });
    // End of Axio
   