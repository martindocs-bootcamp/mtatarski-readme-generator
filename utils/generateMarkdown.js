// function to generate markdown for README
function generateMarkdown(data) {
  console.log(data)
  return `
<div style="text-align: center;">${data.has_logo ? `\n\t<img src="./images/${data.logoImage}" width="100" alt="${data.logoImage.split('.')[0]} logo image" />` : ''}
  <h1>${data.title}</h1>

${data.tech}

[![License: ${data.licenseType}](${data.licenseUrl})](https://opensource.org/licenses/${data.licenseType})
  
</div>

---

## Table of Contents
- [📍 Overview](#-overview)
- [📦 Features](#-features)
- [📂 Repository Structure](#-repository-structure)
- [⚙️ Modules](#%EF%B8%8F-modules)
- [🚀 Getting Started](#-getting-started)
    - [🔧 Installation](#-installation)
    - [🤖 Running Kids Pocket Money App](#-running-kids-pocket-money-app)
    - [🌐 Live Demo Kids Pocket Money App](#-live-kids-pocket-money-app)
    - [📸 Screenshot Kids Pocket Money App](#--kids-pocket-money-app)
- [🛣 Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👏 Acknowledgments](#-acknowledgments)

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
