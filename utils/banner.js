// Program's information
const title = 'README GENERATOR';
const author = 'Marcin Tatarski';
const version = '1.0';
const date = '15/01/2024';
const description = 'A versatile README Generator.';
const repository = 'https://github.com/martindocs/mtatarski-readme-generator';
const help = 'node index.js --help';

// Function to display a banner with program information
function banner ()  {
  console.log(    
    `
  ╔═══════════════════════════════════════════════════════════════════════════════╗
  ║ ${title} v${version}                                                         ║
  ║ Author: ${author}                                                       ║
  ║ Date: ${date}                                                              ║
  ║ Description: ${description}                                    ║
  ║ Repository: ${repository}          ║
  ║ Help: ${help}                                                    ║
  ║ License: MIT                                                                  ║
  ╚═══════════════════════════════════════════════════════════════════════════════╝
    `
    );
};

module.exports = banner;