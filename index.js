const fs = require("fs");
const path = require('path');
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

// Markdown symbols
/**
 email - DONE
 github account - DONE
 logo (optional) - DONE
 title - DONE
 description - DONE
 screenshoot (optional) - DONE
 installation - DONE
 usage - DONE
 contributing - DONE
 tests - DONE
 questions  - DONE
 licence - DONE
 
 table of context (based on above)

 */

function validation(input, textType){  
  if(input.trim() === ''){
    return `${textType} cannot be empty.`;
  } else if(input.length < 5){
    return `${textType} needs to be at least 5 characters.`;
  }

  return true;
}

// Function for the "editor" question
function promptText(textType, msg) {
  return inquirer.prompt([
    {
      type: 'input',
      message: msg,
      name: textType,      
      validate: (input) => validation(input, textType),
    },    
  ]);
}

function promptTextConfirm(textType, msg) {
  const has_text = `has_${textType}`;

  return inquirer.prompt([
    {
      type: "confirm",
      message: `Any ${textType} to this project?`,    
      name: has_text,
      default: false,
    },    
    {
      type: "input",
      message: "Enter the GitHub usernames (comma separated)",
      name: `${textType}Text`,
      when: (answers) => answers[has_text],
    },
  ]);
}
  
// Function for 'image' question
function promptImage(imgType){
  const has_img = `has_${imgType}`;

  return inquirer.prompt([
    {
      type: "confirm",
      message: `Do you want to include a ${imgType} image? (Ensure it's in 'temp/images' before proceeding) `,
      name: has_img,
      default: false,
    },    
    {
      type: "input",
      message: "Enter the name of your image file (with extension) ",
      name: `${imgType}Image`,
      when: (answers) => answers[has_img],
    },
  ]);
}

// Function to ask for repeating input
async function promptRepeat(textType, msg) {
  const answers = [];
  
  const isProcede = await inquirer.prompt([
    {
      type: 'confirm',
      name: textType,
      message: `Do you want to add ${textType} section?`,
      default: false,
    },
  ]);
  
  if(isProcede[textType]){
    let askAgain = true;    

    while (askAgain) {
      const response = await inquirer.prompt([
        {
          type: 'input',
          name: textType,
          message: msg,        
          validate : (input) => validation(input, textType),  
        },
        {
          type: 'input',
          name: `${textType}Desc`,
          message: `Enter the ${
            textType === 'instalation' || textType === 'test' ? 
            `${textType} command` : `${textType} description`
          }`,
          validate : (input) => validation(input, textType),   
        },
        {
          type: 'confirm',
          name: 'askAgain',
          message: `Want to enter another ${
            textType === 'instalation' || textType === 'test' ? 
            `${textType} step` : textType
          } (enter for YES)?`,
          default: true,
        },
      ]);
  
      answers.push({name: response[textType], description: response[`${textType}Desc`]});    
      askAgain = response.askAgain;
    }
  
    return {[textType]: answers };
  }
}


function promptTechnology(){  
  return inquirer.prompt([
    {
      type: 'checkbox',
      message: 'Select technologies used in this project',
      name: 'technologies',
      choices: ['JavaScript', 'React', 'Node.js', 'CSS', 'MySQL', 'SQL', 'JQuery', 'HTML'],
      validate(answer) {
        if (answer.length < 1) {
          return 'You must choose at least one technology.';
        }

        return true;
      },
    }
  ])
} 

function promptLicense(){  
  return inquirer.prompt([
    {
      type: 'list',
      name: 'license',
      message: 'What kind of license should your project have?',
      choices: ['MIT', 'BSD 3', 'GPL v3', 'MPL 2', 'Apache 2'],
      // filter(val) {
      //   return val.toLowerCase();
      // },
    },
  ])
}

function generateReadme(fileName, data){  
  fs.writeFile(fileName, data, 'UTF-8', (err) =>{
    if(err){
      console.log(err);
      return;
    }

    console.log('Generating README...');
  });
}


// Function to ask questions
async function askQuestions() {
  try {
    
    const githubUserNameAnswer = await promptText('GitHub', 'What is your GitHub username?');

    const emailAnswer = await promptText('email', 'What is your email address?');

    const logoAnswer = await promptImage('logo');

    const projectNameAnswer = await promptText('title', 'What is your project\'s title?');   

    const descriptionAnswer = await promptText('description', 'Please write a short description of your project');

    const technologyAnswer = await promptTechnology();

    const licenseAnswer = await promptLicense();

    const screenshotAnswer = await promptImage('screenshot');
    
    let screenDescriptionAnswer = {};
    if(screenshotAnswer['has_screenshot']){
      screenDescriptionAnswer = await promptText('screenshotDesc', 'Please write an short screenshot description');
    }
    
    const featuresTableAnswer = await promptRepeat('feature', 'Enter feature name');

    const modulesTableAnswer = await promptRepeat('module', 'Enter module name (with extension)');

    const instalationAnswer = await promptRepeat('instalation', 'Enter instalation step');

    const usageAnswer = await promptRepeat('usage', 'What does the user need to know about using the repo?');

    const testAnswer = await promptRepeat('test', 'What commands should be run to run the tests?');

    const acknowledAnswer = await promptTextConfirm('acknowledgments');

    const licenses = { 
      'MIT':'https://img.shields.io/badge/License-MIT-yellow.svg',      
      'BSD 3':'https://img.shields.io/badge/License-BSD_3--Clause-orange.svg',
      'GPL v3':'https://img.shields.io/badge/License-GPLv3-blue.svg',
      'MPL 2':'https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg',
      'Apache 2':'https://img.shields.io/badge/License-Apache_2.0-yellowgreen.svg',
    };

    const license = {
      licenseType: licenseAnswer['license'],
      licenseUrl: licenses[licenseAnswer['license']]
    };

    const technologies = {
      "JavaScript" : '[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)', 
      "React" : '[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)',
      "Node.js" : '[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)', 
      "CSS" : '[![CSS](https://img.shields.io/badge/CSS3-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS)',
      "MySQL" : '[![MySQL](https://img.shields.io/badge/MySQL-lightgrey.svg)](https://www.mysql.com/)',
      "SQL" : '[![SQL](https://img.shields.io/badge/SQL-lightgrey.svg)](https://www.mysql.com/)',
      "JQuery" : '[![jQuery](https://img.shields.io/badge/jQuery-3.x-blueviolet.svg)](https://jquery.com/)',
      "HTML" : '[![HTML](https://img.shields.io/badge/HTML5-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/HTML)'
    }

    const technologiesPicked = Object.entries(technologies)
    .filter((technology) => JSON.stringify([technologyAnswer['technologies']]).includes(technology[0]))
    .map(url => url[1])
    .join(' ');

  
    // Combine all answers
    const allAnswers = generateMarkdown({
      ...githubUserNameAnswer,
      ...emailAnswer,
      ...logoAnswer,
      ...{tech: technologiesPicked},
      ...projectNameAnswer,
      ...descriptionAnswer,
      ...license,
      ...screenshotAnswer,
      ...screenDescriptionAnswer,
      ...featuresTableAnswer,
      ...modulesTableAnswer,
      ...instalationAnswer,
      ...usageAnswer,
      ...testAnswer,
      ...acknowledAnswer,
    });

    // Generate markdown
    // const markdownContent = generateMarkdown(allAnswers);
 
    // writeToFile('README.md', markdownContent);
    generateReadme('./output/README.md', allAnswers);

    // console.log('Generating README...');
  } catch (error) {
    console.error('Error during question prompts:', error);
  }
}

// Call the main function to start asking questions
askQuestions();


