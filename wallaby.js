module.exports = function () {
  return {
    files: [
      'tsconfig.json',
      'package.json',
      { pattern: 'src/**/*.ts', load: false },
      { pattern: '**/*spec.ts', ignore: true },
      { pattern: 'test/**', ignore: true },
    ],
    tests: [{ pattern: '**/*.spec.ts' }],
    env: {
      type: 'node',
      runner: 'node',
    },
    filesWithNoCoverageCalculated: ['src/**/*.module.ts', 'src/main.ts'],
    hints: {
      ignoreCoverageForFile: /ignore file coverage/,
    },
    testFramework: 'jest',
  };
};
