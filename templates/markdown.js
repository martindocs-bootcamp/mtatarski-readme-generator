// function to generate markdown for README
function generateMarkdown(data) {  
  return `
<div align="center">${data.has_logo ? `\n\t<img src="./images/${data.logoImage}" width="100" alt="${data.logoImage.split('.')[0]} logo image" />` : ''}
  <h1 style="margin: 0">${data.title}</h1>

${data.tech}

[![License: ${data.licenseType}](${data.licenseUrl})](https://opensource.org/licenses/${data.licenseType})
  
</div>

---

## Table of Contents

---

## Overview
${data.description}

---

${
  data.has_screenshot ? 
  `
  ## Screenshot
  ![${data.logoImage.split('.')[0]}](./images/${data.screenshotImage})
  *${data.screenshotDesc}*` : ''    
}

---

${
  data.feature ? 
  `

  ` : ''
}

`;
}

module.exports = generateMarkdown;
