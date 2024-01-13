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
 usage 
 contributing
 tests
 questions  
 licence 
 
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
          message: `Enter the description of the ${textType}:`,
          validate : (input) => validation(input, textType),   
        },
        {
          type: 'confirm',
          name: 'askAgain',
          message: `Want to enter another ${textType === 'instalation' ? `${textType} step` : textType} (enter for YES)?`,
          default: true,
        },
      ]);
  
      answers.push({name: response[textType], description: response[`${textType}Desc`]});    
      askAgain = response.askAgain;
    }
  
    return {[textType]: answers };
  }
}

// Function to ask questions
async function askQuestions() {
  try {
    
    const githubUserNameAnswer = await promptText('GitHub', 'What is your GitHub username?');

    const emailAnswer = await promptText('email', 'What is your email address?');

    const projectNameAnswer = await promptText('name', 'What is your project name?');
   
    const logoAnswer = await promptImage('logo');

    const descriptionAnswer = await promptText('description', 'Please write a short description of your project');

    const screenshotAnswer = await promptImage('screenshot');
    
    const featuresTableAnswer = await promptRepeat('feature', 'Enter feature name');

    const modulesTableAnswer = await promptRepeat('module', 'Enter module name');

    const instalationAnswer = await promptRepeat('instalation', 'Enter instalation steps');

    // Combine all answers
    const allAnswers = {
      ...githubUserNameAnswer,
      ...emailAnswer,
      ...projectNameAnswer,
      ...logoAnswer,
      ...descriptionAnswer,
      ...screenshotAnswer,
      ...featuresTableAnswer,
      ...modulesTableAnswer,
      ...instalationAnswer,

    };

    console.log(allAnswers)
    // Generate markdown
    const markdownContent = generateMarkdown(allAnswers);
 
    // writeToFile('README.md', markdownContent);

    console.log('Generated README:\n', markdownContent);
  } catch (error) {
    console.error('Error during question prompts:', error);
  }
}

// Call the main function to start asking questions
askQuestions();


