const argv = require('minimist')(process.argv.slice(2));

// Import functions for handling configuration operations
const { loadConfig, updateConfig, saveConfig } = require('./config');

// Function to handle configuration logic based on command line arguments
function configLogic() {
  // Load the configuration file
  let config = loadConfig();
  
  // Check if the 'banner' flag is set in the command line arguments
  if (argv.banner) {
    console.log('Banner is ON');
    config.banner = true;
    config.nobanner = false;
  } else if(argv.nobanner){
    console.log('Banner is OFF');
    config.banner = false;
    config.nobanner = true;
  } 

  // Update configuration 
  config = updateConfig(config, argv);

  // Save the updated configuration to the file
  saveConfig(config);
}

module.exports = configLogic;