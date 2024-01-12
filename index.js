const fs = require("fs");
const path = require('path');
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

// Markdown symbols
/**
  - logo (optional)
  - title
  - description
  - screenshoot (optional)
  - installation
  - usage
  - contributing
  - tests
  - questions  
  - licence (list)

  table of context (based on above)

 */

  
function propmtSections(){
  return inquirer.prompt([
    {
      type: "confirm",
      message: "Do you want to include a Logo of your app? ",
      name: "has_logo",
      default: false,
    },
    {
      type: "input",
      message: "Enter the name of your image file (with extension): ",
      name: "logoImage",
      when: (answers) => answers.has_logo,
    },
    {
      type: "input",
      message: "Title: ",
      name: "title",
      validate: (input) => input.trim() !== '',
    },
    {
      type: "input",
      message: "Please provide project description: ",
      name: "description",
      validate: (input) => input.trim() !== '',
    },
    {
      type: "confirm",
      message: "Do you want to include an screenshot image? ",
      name: "has_screenshot",
      default: false,
    },
    {
      type: "input",
      message: "Enter the name of your image file (with extension): ",
      name: "screenshotImage",
      when: (answers) => answers.has_screenshot,
    },
    {
      type: "checkbox",
      message: "Please select one of the following license : ",
      name: ['dsds', 'dsd', 'dsds'],
      value: 
    }
])}



// array of questions for user
const questions = [

];

// function to write README file
function writeToFile(fileName, data) {
}

// function to initialize program
function init() {

}

// function call to initialize program
init();
