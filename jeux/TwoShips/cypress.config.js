import {defineConfig} from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5000/JeuxVideoOps/TwoShips',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: false,
  },
});
