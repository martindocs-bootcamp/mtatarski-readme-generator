const fs = require('fs');
const path = require('path');

// Function to write data to a file
function writeFiles(fileName, data){  

  // Extract the directory path from the destinationPath
  const destinationDir = path.dirname(fileName);  

  // Check if the destination folder exists, if not, create it
  if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir, { recursive: true });
  }

  fs.writeFile(fileName, data, 'UTF-8', (err) =>{
    if(err){
      console.log(err);
      return;
    }  
  });
};

module.exports = writeFiles;