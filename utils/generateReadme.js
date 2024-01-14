const fs = require('fs');

function generateReadme(fileName, data){  
  fs.writeFile(fileName, data, 'UTF-8', (err) =>{
    if(err){
      console.log(err);
      return;
    }

    console.log('Generating README...');
  });
};

module.exports = generateReadme;