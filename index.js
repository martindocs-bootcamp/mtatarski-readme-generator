const configLogic = require("./config/configLogic");
const inquirer = require("inquirer");
const banner = require('./utils/banner');
const markdownTemplate = require("./templates/markdown");
const licenseTemplate = require("./templates/license");
const copyImage = require("./utils/copyImages");
const writeFile = require("./utils/writeFiles");
const generateFolderName = require("./utils/idsGenerator");
const showHelp = require("./help/help");
const argv = require('minimist')(process.argv.slice(2))
const config = require("./config/config.json");
const clearScreen = require('./utils/clearScreen');

// Load configuration
configLogic();

// clear screen
clearScreen();

// Check for --help flag
if (argv.help) {
  showHelp();
} else{
  // Continue with the main program 
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
  
  if(textType === 'module' || textType === 'test'){    
    const isProcede = await inquirer.prompt([
      {
        type: 'confirm',
        name: textType,
        message: `Do you want to add ${textType} section?`,
        default: false,
      },
    ]);
    
    if(!isProcede[textType]) {
      return {[textType]: false}
    };
  }  
  
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
          textType === 'test' ? 
          `${textType} step` : `${textType} description`
        } (enter for YES)?`,
        default: true,
      },
    ]);

    answers.push({name: response[textType], description: response[`${textType}Desc`]});    
    askAgain = response.askAgain;
  }
  
  return {[textType]: answers };
  
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
      choices: ['MIT', 'BSD3', 'GPLv3', 'MPL2', 'Apache2'],     
      },
    ])
}

// Markdown icons
const icons = {
  table: "📖",
  overview: "📄",        
  screenshot: "🖼️",      
  features: "🚀",        
  installation: "⚙️",    
  usage: "🔍",           
  modules: "📦",         
  contributing: "🤝",    
  test: "🧪",            
  questions: "❓",       
  license: "📜",         
  acknowledge: "🙏", 
};

// Function to filter table of contents based on user responses
function filterTableOfContents(answers) {
  const tableOfContents = {
    description: `- [${icons.overview} Overview](#-overview)`,
    has_screenshot: `- [${icons.screenshot} Screenshot](#-screenshot)`,
    feature: `- [${icons.features} Features](#-features)`,
    installation: `- [${icons.installation} Installation](#-installation)`,
    usage: `- [${icons.usage} How to use it](#-how-to-use-it)`,
    module: `- [${icons.modules} Modules](#-modules)`,
    repo: `- [${icons.contributing} Contributing](#-contributing)`,
    test: `- [${icons.test} Testing](#-testing)`,
    email: `- [${icons.questions} Questions](#-questions)`,
    licenseType: `- [${icons.license} License](#-license)`,
    acknowledge: `- [${icons.acknowledge} Acknowledgments](#-acknowledgments)`,
  };
  
  // Filtered data entries user didnt choose
  const filteredEntries =Object.entries(answers)  
  .filter(([_, value]) => value) // Filter 'false' values / not choosen
  .map(([key]) => key); // Getting keys of filtered entries
  
  // Return the Table of Contents which user has chosen
  return Object.entries(tableOfContents)
  .filter(([key]) => filteredEntries.includes(key))
  .map(([_, value]) => value).join('\n');
}


// Function to ask questions
async function askQuestions() {
  // Display the banner  
  if (config.banner === true) {        
      banner();
  }
  
  try {
    
    // GitHub username
    const githubUserNameAnswer = await promptText('GitHub', 'What is your GitHub username?');
    
    // User email address
    const emailAnswer = await promptText('email', 'What is your email address?');
    
    // Repository name
    const repoAnswer = await promptText('repo', 'What is your repository name?');
    
    // License type
    const licenseBadgesAnswer = await promptLicense();
    
    const licensesBadges = { 
      'MIT':'https://img.shields.io/badge/License-MIT-yellow.svg',      
      'BSD3':'https://img.shields.io/badge/License-BSD_3--Clause-orange.svg',
      'GPLv3':'https://img.shields.io/badge/License-GPLv3-blue.svg',
      'MPL2':'https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg',
      'Apache2':'https://img.shields.io/badge/License-Apache_2.0-yellowgreen.svg',
    };
    
    const licenseBadge = {
      licenseType: licenseBadgesAnswer['license'],
      licenseUrl: licensesBadges[licenseBadgesAnswer['license']]
    };
    
    // Technologies used
    const technologyAnswer = await promptTechnology();
    
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
    
    // Project title
    const projectNameAnswer = await promptText('title', 'What is your project\'s title?');   
    
    // Project description
    const descriptionAnswer = await promptText('description', 'Please write a short description of your project');
    
    // Project installation process
    const instalationAnswer = await promptRepeat('instalation', 'Please provide installation description');
    
    const installation = instalationAnswer['instalation'].map((steps, index) => {
      return `${index + 1}. ${steps.name}:\n\`\`\`sh\n${steps.description}\n\`\`\`\n`
    }).join('');
    
    // How to use project 
    const usageAnswer = await promptText('usage', 'What does the user need to know about using the repo? (sentance separated with fullstop)');
    
    const usage = usageAnswer['usage']
    .split('.')
    .filter(empty => empty !== '')
    .map((str, index) => `${index + 1}. ${str.trim()}`)
    .join('\n')
    
    // Project features
    const featuresTableAnswer = await promptRepeat('feature', 'Please provide name of the project feature');
    
    const features = featuresTableAnswer['feature'].map((feature) => `| ${feature.name} | ${feature.description} |`).join('\n');
    
    // Project logo
    const logoAnswer = await promptImage('logo');
    
    // Project screenshot
    const screenshotAnswer = await promptImage('screenshot');
    
    let screenDescriptionAnswer = {};
    if(screenshotAnswer['has_screenshot']){
      screenDescriptionAnswer = await promptText('screenshotDesc', 'Please write an short screenshot description');
    }
    
    // Project modules
    const modulesTableAnswer = await promptRepeat('module', 'Enter module name (with extension)');
    
    let module = false;
    if(modulesTableAnswer['module']){
      module = modulesTableAnswer['module'].map((file) => {
        return `| ${file.name} | ${file.description} |`
      }).join('\n');
    }
    
    // Project test process
    const testAnswer = await promptRepeat('test', 'What commands should be run to run the tests?');
    
    let test = false;
    if(testAnswer['test']){
      test = testAnswer['test'].map((steps, index) => {
        return `${index + 1}. ${steps.name}:\n\`\`\`sh\n${steps.description}\n\`\`\`\n`
      }).join('');
    }
    
    // Acknowledge
    const acknowledAnswer = await promptTextConfirm('acknowledgments');
    
    let acknowledge = false;
    if(acknowledAnswer['acknowledgmentsText']){
      acknowledge = acknowledAnswer['acknowledgmentsText']
      .split(',')
      .filter(empty => empty !== '')
      .map((str) => `- ${str.trim()}`)
      .join('\n')
    }
    
    // All answers
    const allAnswers = {
      ...githubUserNameAnswer,
      ...emailAnswer,
      ...repoAnswer,
      ...licenseBadge,
      ...{tech: technologiesPicked},
      ...projectNameAnswer,
      ...descriptionAnswer,
      ...{installation: installation},
      ...{usage: usage},
      ...{feature: features},
      ...logoAnswer,
      ...screenshotAnswer,
      ...screenDescriptionAnswer,
      ...{module: module},
      ...{test: test},
      ...{acknowledge: acknowledge},
    };
    
    
    // Generate unique folder name with current date
    const folderName = generateFolderName();
    
    // Output folder got Readme files
    const folderPath = `./output/${folderName}`;
    
    // Filtered Table of Contents
    const table = filterTableOfContents(allAnswers);
    
    // Data for generating the Readme file
    const readme =  markdownTemplate({
      ...allAnswers,
      ...{table: table},
      ...{icons: icons},
    });
    
    // Generating the Readme file
    writeFile(`${folderPath}/README.md`, readme);   
    
    // Data for generating the Readme file
    const license =  licenseTemplate({
      ...projectNameAnswer,
      ...licenseBadge,
      ...emailAnswer,
    });
    
    console.log('Generating README...');
    
    // Generate the license
    writeFile(`${folderPath}/LICENSE.md`, license);
    
    // Copy the logo image
    if(logoAnswer['has_logo']){
      const logoImage = JSON.stringify(logoAnswer['logoImage']).split('"')[1];
      copyImage(`./temp/images/${logoImage}`, `./output//${folderName}/images/${logoImage}`);
    }
    
    // Copy the screenshot image
    if(screenshotAnswer['has_screenshot']){
      const screenshotImage = JSON.stringify(screenshotAnswer['screenshotImage']).split('"')[1];
      copyImage(`./temp/images/${screenshotImage}`, `./output//${folderName}/images/${screenshotImage}`);
    }
    
  } catch (error) {
    console.error('Error during question prompts:', error);
  }
}

  // Call the main function to start asking questions
  askQuestions();
}


