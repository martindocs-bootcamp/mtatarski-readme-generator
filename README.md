# Profesional Readme Generator 

## Overview

The Readme Generator is a command-line application built to simplify the creation of professional README files for GitHub projects. As a crucial aspect of open source development, a comprehensive README provides vital information to users, contributors, and collaborators. This tool automates the README generation process, allowing project creators to allocate more time to actual development.

The primary tools used include:

- **Node.js:** powers the Readme Generator, providing a robust JavaScript runtime for executing command-line operations efficiently. 


## Screenshot

![Readme Generator](./assets/images/readme-generator.png)

*The Readme Generator main screen.*

## Installation

To use the Readme Generator, follow these steps:

1. Ensure you have [Node.js](https://nodejs.org) installed.
2. Clone this repository to your local machine.

```sh
git clone https://github.com/martindocs/mtatarski-readme-generator.git
```

3. Navigate to the project directory.

```sh
cd mtatarski-readme-generator
```

4. Install dependencies.

```sh
npm install
```

## How to Use


1. Run the application using the following command:

```sh
node index.js
```

2. Answer the prompts to customize your README.
3. Once completed, find the generated README in the `output` folder.
4. For a quick demonstration, you can watch a short video on youtube [▶️ watch a short video](https://www.youtube.com/#) showcasing how to use the Readme Generator.

## Dependencies

The following Node.js packages are utilized in this project:

- **Inquirer**: A powerful package for handling user prompts, enabling dynamic input in the command line.

```sh
npm install inquirer
```

- **Node-banner**: A package for creating banners in the terminal.

```sh
npm install node-banner
```

## Features

- **Dynamic README Generation:** Create README files dynamically through user input utilizing the Inquirer package.
- **Customization Options:** Tailor your README by easily adding a logo or screenshot to enhance project visibility.
- **Multiple README Support:** Generate multiple README files without overwriting each other. Each file is stored in a uniquely named folder (e.g., YYYYMMDD-HHMMSS).

## Contributions

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github.com/mtatarski-readme-generator/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/mtatarski-readme-generator/discussions)**: Share your insights, provide feedback, or ask questions.
- **[Report Issues](https://github.com/mtatarski-readme-generator/issues)**: Submit bugs found or log feature requests.

#### *Contributing Guidelines*

<details closed>
<summary>Click to expand</summary>

1. **Fork the Repository**: Start by forking the project repository to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine using a Git client.
   ```sh
   git clone <your-forked-repo-url>
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```

4. **Make Your Changes**: Develop and test your changes locally.
5. **Add Changes to Staging Area**:
   ```sh
   git add -A 
   ```
6. **Commit Your Changes**: Commit with a clear and concise message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
7. **Push to GitHub**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
8. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.

  Once your PR is reviewed and approved, it will be merged into the main branch.

9. **Switch Back to Main Branch and Pull Sync with Main**: If you wish to work on a new feature/change, switch back to the main branch and sync with the latest changes.
  ```sh
  git checkout main
  git pull origin main
  ```
10. **Repeat the Process if Necessary**: Start from point 3 onwards.

</details>

## License

Please refer to the [LICENSE](./LICENSE.md) file in this repository for details on how this project is licensed.
