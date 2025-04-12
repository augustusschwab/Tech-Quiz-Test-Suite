# Tech Quiz Test Suite

## Description
This is a Cypress testing suite on a test quiz web application. The application randomly presents a series of multiple choice web development questions to the user; the score is then presented once the use is complete. The functionality of the application is both component tested and E2E tested using the Cypress testing.

## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)
  
## Installation
To install, clone, or download the project folder, run `npm install` from the root directory followed by `npm run build`. The application uses the `React`, `express`, and `mongoose` JavaScript packages to allow interaction with the MongoDB database. Ensure MongoDB is downloaded to the user's machine.

## Usage
Once a root folder is set up on the user's machine and the dependencies are installed, start by initializing the MongoDB database. Then run `npm run start:dev`, this will start the client and server. Once the client and server are running, open a new terminal window and run `npm run cypress`, this will launch the cypress UI, select desired test from the cypress UI. A walkthrough video is shown below.

  [Walkthrough Video](https://drive.google.com/file/d/1KDeDVGvpOmZN9cc3Rfup-cOZvzEptlTF/view?usp=sharing)

## Contributing
  To contribute to this repository, please contact the repository owner via the email in the questions section.
  
## Tests
  There are two different tests set up for this application: a component test and E2E testing. 
  - Component Test: this tests the quiz component of the application. It ensures the quiz can start and than moves through the user experience with the component from starting the quiz to viewing the score after completion.
  - E2E Test: This test ensures all server calls are working correctly and follows a similar structure to the component test. Since this is a simple application (single component), the E2E test tests the full cycle of the quiz, which is ultimately a test of the quiz component. 
  
## Questions
  Github: augustusschwab
  
  For additional questions, please send an email to augustusschwab@gmail.com.
  
  
> [!NOTE]
  >All code was written by Gus Schwab using the starter code provided in Module 19 of the U of U Software Development Bootcamp.
