const fs = require('fs');
const path = require('path');

// Function to copy an image file from source to destination
function copyImage(srcPath, destPath) {

  // Extract the directory path from the destinationPath
  const destinationDir = path.dirname(destPath);

  // Check if the destination folder exists, if not, create it
  if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir, { recursive: true });
  }

   // Read the contents of the source image file
  const image = fs.readFileSync(srcPath);
  
  // Synchronous operation that ensures that the file write operation is completed before the function returns.
  fs.writeFileSync(destPath, image);
};

module.exports = copyImage;