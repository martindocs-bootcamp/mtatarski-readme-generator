const fs = require('fs');

function writeFiles(fileName, data){  
  fs.writeFile(fileName, data, 'UTF-8', (err) =>{
    if(err){
      console.log(err);
      return;
    }

    console.log('Generating README...');
  });
};

module.exports = writeFiles;