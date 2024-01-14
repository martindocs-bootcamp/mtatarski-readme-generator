const fs = require('fs');
const path = require('path');

function copyImage(srcPath, destPath) {

  // Extract the directory path from the destinationPath
  const destinationDir = path.dirname(destPath);

  // Check if the destination folder exists, if not, create it
  if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir, { recursive: true });
  }

   // Read the contents of the source image file
  const image = fs.readFileSync(srcPath);

  // Write the contents to the destination image file
  fs.writeFileSync(destPath, image);
};

module.exports = copyImage;