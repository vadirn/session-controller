module.exports = {
  moduleDirectories: ['node_modules', 'peer_dependencies/node_modules'],
  transform: {
    '^.+\\.js$': '<rootDir>/jest.transform.js',
  },
  transformIgnorePatterns: [
    '.*/node_modules/(?!(object-state-storage)/).*/',
    '.*/peer_dependencies/node_modules/(?!(object-state-storage)/).*/',
  ],
};
