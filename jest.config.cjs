
module.exports = {
  preset: 'ts-jest',
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^.+\\.(css|scss)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/fileMocks.js"
  },
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
};