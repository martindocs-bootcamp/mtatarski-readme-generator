const showBanner = require('node-banner');

// Program's information
const title = 'Readme Generator';
const author = 'Marcin Tatarski';
const version = '1.0';
const date = '15/01/2024';
const description = 'A versatile README Generator. Quickly create professional README files for your projects.';
const repository = 'https://github.com/martindocs/mtatarski-readme-generator';

async function banner ()  {
  await showBanner(
    title, 
    `
      Author: ${author} \n 
      Date: ${date} \n 
      Version: ${version} \n
      Description: ${description} \n
      Repository: ${repository} 
    `);
};

module.exports = banner;