const glob = require('glob-all');

describe('Checking generated html files', () => {
    it('should generate html files', (done) => {
      //根据node路径
        const files = glob.sync([
            './build/index.html',
            './build/search.html'
        ]);
        if (files.length > 0) {
            done();
        } else {
            throw new Error('no html files generated');
        }
    });
});
