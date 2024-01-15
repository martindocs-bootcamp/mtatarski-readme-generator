const fs = require('fs');
const path = require('path');
const minimist = require('minimist');

const argv = minimist(process.argv.slice(2),{
  boolean: ['banner', 'nobanner'], // boolean flags
});
const config = loadConfig();
updateConfig(config, argv);

function loadConfig() {
  const filePath = path.resolve(__dirname, 'config.json');

  try {
    return JSON.parse(fs.readFileSync(filePath, 'UTF-8'));    
  }catch(e) {
    console.error('Error reading or parsing config file');
    return {
      // Set default values for your flags
      "banner": true,
      "nobanner": false,
      "help": true
    };
  }
}

function updateConfig(config, flags) {

   // Iterate through flags and update corresponding keys in the config
   Object.keys(flags).forEach((flag) => {
     // Skip reserved flags like '_', 'version', etc.   
    if (flag !== '_' && flag !== 'version') {      
        config[flag] = flags[flag];      
    }    
  });

  return config;
}

function saveConfig(config){
  const filePath = path.resolve(__dirname, './config.json');

  try {    
    fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
  } catch (e) {
    console.error('Error writing config file:', e.message);
  }
}

module.exports = {
  loadConfig,
  updateConfig,
  saveConfig,
}

