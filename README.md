# React + Vite + Cypress + Github Actions

## Description
This app is a research for TDD with vitest and cypress and how to deploy the app using Github actions, the exercise it was took from a real technical test

## First steps
After clone the project, you would to have node on your laptop and npm, the version recommended is:

Node: 20.9.0 or upper
NPM: 10.1.0 or upper

Note: I recommended to use NVM for manage different node versions

### Install package
Open in your terminal the folder when you clone de repository and execute the next command:

npm install

After that you have 2 options for see the app:

1. execute: npm run dev
If you want to see the site on dev stage

2. execute: npm run build
If you want to see the site form bundles (you need to navigate in your folder app and open /docs folder and then open index.html file)

## Other scripts

npm run test
It command run the test and open vite ui and show the test and coverage

npm run cy:open-e2e
It command run e2e test in cypress

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
