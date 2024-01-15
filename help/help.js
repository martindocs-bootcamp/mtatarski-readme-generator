const { program } = require('commander');
const clearScreen = require('../utils/clearScreen');

// Function to show the command help 
function showHelp() {
  
  // disable commander -h option
  program.helpOption(false); // Disable the default help option

  program
    .description('Readme Generator - Quickly create professional README files for your projects.')
  
 // Define the options to show on the command line
 program
  .option('--banner', 'Show banner')
  .option('--nobanner', 'Hide banner')
  .option('--help', 'Display help')
  .on('--dhelp', function () {
    console.log('');
    console.log('  Examples:');
    console.log('');
    console.log('    $ node index.js --banner');
    console.log('    $ node index.js --nobanner');
    console.log('    $ node index.js --help');
  });

  /**
   Parse the process.argv array. It goes through the command-line arguments,    matches them against the options and commands with program.option() and program.command(), and executes the corresponding code.
   */
  program.parse(process.argv);

  if (program.help) {
    // Clear the console before showing help
    clearScreen();
    program.outputHelp(); // Prints the help information to the console
  }
}

module.exports = showHelp;