const path = require('path');
const webpack = require('webpack');
/**
 * rimraf: 以包的形式包装rm -rf命令，用来删除文件和文件夹的，不管文件夹是否为空，都可删除
 * rimraf(f, [opts], callback)
 * @param f a globbing pattern for files
 * @param [opts] 配置
 * @param callback 回调
 */
const rimraf = require('rimraf');
const Mocha = require('mocha');

const mocha = new Mocha({
    timeout: '10000ms'
});



rimraf('../../buid', () => {
    const prodConfig = require('../../config/webpack.pro.js');

    webpack(prodConfig, (err, stats) => {
        if (err) {
            console.error(err);
            process.exit(2);
        }
        console.log(stats.toString({
            colors: true,
            modules: false,
            children: false
        }));

        console.log('Webpack build success, begin run test.');
        mocha.addFile(path.join(__dirname, 'html-test.js'));
        mocha.addFile(path.join(__dirname, 'css-js-test.js'));
        mocha.run();
    });
});
