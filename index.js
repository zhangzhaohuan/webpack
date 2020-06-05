if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/large-number-zzh.min.js');
} else {
  module.exports = require('./dist/large-number-zzh.js');
}