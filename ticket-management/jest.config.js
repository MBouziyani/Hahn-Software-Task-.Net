module.exports = {
    transform: {
      '^.+\\.[tj]sx?$': 'babel-jest',
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mocking styles if any
    },
    transformIgnorePatterns: ['/node_modules/(?!(axios)/)'], // Transpile axios with Babel
    testEnvironment: 'jsdom', // Required for testing React components
  };
  