import {defineConfig} from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5000/JeuxVideOps/TwoShips',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: false,
  },
});
