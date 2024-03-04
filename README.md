# QA code exercise

## Prerequisites

- Node = 16
- NPM >= 5.6
- Git

## Getting started

1. Clone the project repository
2. Install the dependencies `npm install`

## About the project

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- [JSON server](https://github.com/typicode/json-server) will give you a fake but realistic REST API using the static `src/server/db.json` file created after running `npm install`. If you make POST, PUT, PATCH or DELETE requests, changes will be automatically saved to `db.json`.

### Project stack

- React (Create React App)
- CSS with Styled-Components
- Tests with React Testing Library

## Available scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3002](http://localhost:3002) to view it in the browser.

[JSON server](https://github.com/typicode/json-server) will run concurrently in watch mode on port 4002 - [http://localhost:4002](http://localhost:4002).

### `npm run seed-db`

Resets `db.json` to the original initial data (`db.base.json`).\
This script runs automatically after `npm install`.

## Available endpoints

- `GET http://localhost:4002/people`: get the full list of people
- `GET http://localhost:4002/people?name_like={substring}`: search for people where the name includes `{substring}`
- `GET http://localhost:4002/people?employment={string}`: search for people where the employment type matches `string`
- `GET http://localhost:4002/people?name_like={substring}&employment={string}`: search for people by name and employment type
- `GET http://localhost:4002/people/{id}`: get the person with id `{id}`
- `POST http://localhost:4002/people`: create a new person
- `PATCH http://localhost:4002/people/{id}`: update the person with id `{id}`

## Cypress Tests

Running Tests:

To open Cypress test runner

```bash
npx cypress open
```

To run test in headless mode

```bash
npm run cypressTest
```

To run tests in different browsers

- [![chrome](https://img.shields.io/badge/CHROME-red?style=flat&logo=google%20chrome&logoColor=white)](https://www.google.com/chrome/)
  [![edge](https://img.shields.io/badge/EDGE-green?style=flat&logo=microsoft%20edge&logoColor=white)](https://www.microsoft.com/edge/)
  [![electron](https://img.shields.io/badge/ELECTRON-blue?style=flat&logo=electron&logoColor=white)](https://www.electronjs.org/)

```bash
npm cypress run  chrome
```

```bash
npm cypress run edge
```

```bash
npm cypress run electron
```

## Reporting

Mochawesome report (Screenshots and Videos are attached by default on test failure) is stored in the `cypress/reports/mochareports/` directory.
