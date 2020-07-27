const assert = require('assert');

describe('webpack.base.js test case', () => {
  const baseConfig = require('../../config/webpack.base.js');
  console.log('======================');
console.log(baseConfig)
    it('entry', () => {
        assert.equal(baseConfig.entry.index, './src/pages/index/index.js');
        assert.equal(baseConfig.entry.search, './src/pages/search/index.js');
    });
});
