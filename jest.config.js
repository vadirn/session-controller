module.exports = {
  transform: {
    '^.+\\.js$': '<rootDir>/jest.transform.js',
  },
  transformIgnorePatterns: ['.*/node_modules/(?!(object-state-storage)/).*/'],
};
