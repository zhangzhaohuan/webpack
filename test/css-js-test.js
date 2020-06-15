const glob = require('glob-all');

describe('Checking generated css js files', () => {
    it('should generate css js files', (done) => {
        const files = glob.sync([
            './build/static/index/js/index*.js',
            './build/static/index/css/index*.css',
            './build/static/search/js/search*.js',
            './build/static/search/css/search*.css',
        ]);

        if (files.length > 0) {
            done();
        } else {
            throw new Error('no css js files generated');
        }
    });
});
