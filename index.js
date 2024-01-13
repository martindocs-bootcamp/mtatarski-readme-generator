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

function promptList(args){
  const {listType, msg, list} = args;

  return inquirer.prompt([
    {
      type: 'list',
      name: listType,
      message: msg,
      choices: list,
      filter(val) {
        return val.toLowerCase();
      },
    },
  ])
}

function generateReadme(fileName, data){
  fs.writeFile(fileName, data, 'utf8', (err) =>{
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

    const projectNameAnswer = await promptText('title', 'What is your project\'s title?');
   
    const logoAnswer = await promptImage('logo');

    const descriptionAnswer = await promptText('description', 'Please write a short description of your project');

    const licenseAnswer = await promptList({
      listType: 'license', 
      msg: 'What kind of license should your project have?',
      list: ['MIT', 'BSD 3', 'GPL v3', 'MPL 2', 'Apache 2']
    });

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

    // Combine all answers
    const allAnswers = {
      ...githubUserNameAnswer,
      ...emailAnswer,
      ...logoAnswer,
      ...projectNameAnswer,
      ...descriptionAnswer,
      ...licenseAnswer,
      ...screenshotAnswer,
      ...screenDescriptionAnswer,
      ...featuresTableAnswer,
      ...modulesTableAnswer,
      ...instalationAnswer,
      ...usageAnswer,
      ...testAnswer,
      ...acknowledAnswer,
    };

    console.log(allAnswers)
    // Generate markdown
    // const markdownContent = generateMarkdown(allAnswers);
 
    // writeToFile('README.md', markdownContent);

    // console.log('Generating README...');
  } catch (error) {
    console.error('Error during question prompts:', error);
  }
}

// Call the main function to start asking questions
askQuestions();


