// function to generate markdown for README
function generateMarkdown(data) {  
  return `
 
<!-- LOGO (optional) -->
<div align="center">${data.has_logo ? `\n\t<img src="./images/${data.logoImage}" width="100" alt="${data.logoImage.split('.')[0]} logo image" />` : ''}

<!-- TITLE -->
  <h1 style="margin: 0">${data.title}</h1>


<!-- TECHNOLOGIES USED -->
${data.tech}

<!-- LICENSE BADGE -->
[![License: ${data.licenseType}](${data.licenseUrl})](https://opensource.org/licenses/${data.licenseType})

</div>


<!-- MENU -->
## ${data.icons['table']} Table of Contents

${data.table}

<!-- OVERVIEW -->
## ${data.icons['overview']} Overview

${data.description}


<!-- SCREENSHOT (optional) -->
${
  data.has_screenshot ? 
  `
## ${data.icons['screenshot']} Screenshot

![${data.screenshotImage.split('.')[0]} screenshot](./images/${data.screenshotImage})
*${data.screenshotDesc}*
` : ''    
}

<!-- FEATURES -->
${
  data.feature ? 
  `
## ${data.icons['features']} Features

| Feature  | Description  |
|----------|--------------|
${data.feature}
` : ''
}


<!-- INSTALLATION -->
## ${data.icons['installation']} Installation

${data.installation}


<!-- USAGE -->
## ${data.icons['usage']} How to use it

${data.usage}


<!-- MODULES -->
${data.module ? 
  `
## ${data.icons['modules']} Modules

<details close><summary>Root</summary>

| File | Summary  |
| ---  | ---      |
${data.module}

</details>

` : ''}


<!-- CONTRIBUTING -->
## ${data.icons['contributing']} Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github.com/${data.repo}/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/${data.repo}/discussions)**: Share your insights, provide feedback, or ask questions.
- **[Report Issues](https://github.com/${data.repo}/issues)**: Submit bugs found or log feature requests.

#### *Contributing Guidelines*

<details closed>
<summary>Click to expand</summary>

1. **Fork the Repository**: Start by forking the project repository to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine using a Git client.
   \`\`\`sh
   git clone <your-forked-repo-url>
   \`\`\`
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   \`\`\`sh
   git checkout -b new-feature-x
   \`\`\`

4. **Make Your Changes**: Develop and test your changes locally.
5. **Add Changes to Staging Area**:
   \`\`\`sh
   git add -A 
   \`\`\`
6. **Commit Your Changes**: Commit with a clear and concise message describing your updates.
   \`\`\`sh
   git commit -m 'Implemented new feature x.'
   \`\`\`
7. **Push to GitHub**: Push the changes to your forked repository.
   \`\`\`sh
   git push origin new-feature-x
   \`\`\`
8. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.

  Once your PR is reviewed and approved, it will be merged into the main branch.

9. **Switch Back to Main Branch and Pull Sync with Main**: If you wish to work on a new feature/change, switch back to the main branch and sync with the latest changes.
  \`\`\`sh
  git checkout main
  git pull origin main
  \`\`\`
10. **Repeat the Process if Necessary**: Start from point 3 onwards.

</details>


<!-- TESTING  -->
${data.test ? 
  `
## ${data.icons['test']} Testing

${data.test}   
  ` : ''
}


<!-- QUESTIONS  -->
## ${data.icons['questions']} Questions

If you have any questions about the ${data.repo} repo, open an [Issues](https://github.com/${data.repo}/issues) or contact me directly at [${data.email}](mailto:${data.email}). You can find more of my work at [${data.GitHub}](https://github.com/${data.GitHub}).


<!-- LICENSE DOCUMENT -->
## ${data.icons['license']} License

Please refer to the [LICENSE](./LICENSE.md) file in this repository for details on how this project is licensed.


<!-- ACKNOWLEDGMENTS -->
${data.acknowledge ? 
  `
## ${data.icons['acknowledge']} Acknowledgments

${data.acknowledge}
    ` : ''
  }
`;
}

module.exports = generateMarkdown;
