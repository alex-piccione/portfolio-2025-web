# portfolio-2025-web

Web UI for Portfolio project

## Tech Stack

- [Vue.js](https://vuejs.org/) with [TypeScript](https://www.typescriptlang.org/)
- [Vue Router](https://router.vuejs.org/) for navigation | NOT ADDED YET
- vue-final-modal: for modal windows | NOT ADDED YET
- [Vite](https://vitejs.dev/) as a build tool
- [Yarn](https://yarnpkg.com/) as a packages manager
- [Pinia](https://pinia.vuejs.org/) for state management
- [Axios](https://axios-http.com/) for API calls | NOT ADDED YET
- NPM ``axios-date-transformer`` library fill the issue with Axios Date management (Axios does not create Date object but use string type.  ) 
- [SASS](https://sass-lang.com/) for CSS pre-processing
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io/) for code formatting


## Usage

Start the development server: ``yarn dev``  
This will start the development server and open the application in your default browser.  You can usually access it at `http://localhost:5173/`.


## Building for Production

Check the build of the application for production: ``yarn build``    
This will create a `dist` directory containing the production-ready files.

### Test Dockerfile

To test the Dockerfile: ``yarn test-docker``.  
This will use the Dockerfile to run a local container (`http://localhost:8080/`).  


## Linting and Formatting

Run ESLint to lint the code: ``yarn lint``      
Run Prettier to format the code: ``yarn format``  

## Deploy

_Dockerfile_ defines the image to be deployed.  
The final image is a _NGINX_ HTTP server for the static SPA builded with Vite.  
No need of Nodejs server.  
