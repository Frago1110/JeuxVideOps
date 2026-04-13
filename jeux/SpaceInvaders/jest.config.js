module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": [
      "ts-jest",
      {
        tsconfig: {
          // Force TypeScript à convertir les import pour que jest les comprenne
          module: "commonjs",
          // Autorise la lecture de fichiers js
          allowJs: true,
        },
      },
    ],
  },
};
