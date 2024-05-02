// Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

// Create an array of questions for user input
const questions = [
  {
    type: 'input',
    name: 'projectTitle',
    message: 'Enter the title of your project:',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Enter a description for your project:',
  },
  {
    type: 'input',
    name: 'installation',
    message: 'Enter installation instructions:',
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Enter usage information:',
  },
  {
    type: 'input',
    name: 'contribution',
    message: 'Enter contribution guidelines:',
  },
  {
    type: 'input',
    name: 'tests',
    message: 'Enter test instructions:',
  },
  {
    type: 'list',
    name: 'license',
    message: 'Choose a license for your project:',
    choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'BSD 3-Clause', 'None'],
  },
  {
    type: 'input',
    name: 'githubUsername',
    message: 'Enter your GitHub username:',
  },
  {
    type: 'input',
    name: 'email',
    message: 'Enter your email address:',
  },
];

// Function to prompt user for input
function promptUser() {
  return inquirer.prompt(questions);
}

// Function to generate README content based on user input
function generateREADME(answers) {
  // Generate README content based on user input
  const licenseBadge = `![License](https://img.shields.io/badge/License-${answers.license}-blue.svg)`;

  const licenseNotice = `
## License
This project is licensed under the ${answers.license} license.
`;

  const readmeContent = `
# ${answers.projectTitle}

${licenseBadge}

## Description
${answers.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

${licenseNotice}

## Contributing
${answers.contribution}

## Tests
${answers.tests}

## Questions
For questions about the project, please contact ${answers.githubUsername} at ${answers.email}.
`;

  return readmeContent;
}

// Function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`${fileName} created successfully!`);
    }
  });
}

// Function to initialize app
function init() {
  promptUser()
    .then((answers) => {
      const readmeContent = generateREADME(answers);
      writeToFile('README.md', readmeContent);
    })
    .catch((error) => {
      console.error('An error occurred:', error);
    });
}

// Call the init function to start the application
init();