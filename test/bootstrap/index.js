/*!
 * OU Media Player - test bootstrap.
 */

var R = global.R = require('./test-config');

global.request = require('request');

/*!
 * Attach ES6 Shim
 */
if (typeof Promise === 'undefined') {
  //require('es6-shim');
}

/*!
 * Attach chai to global should
 */

var chai = global.chai = require('chai');

global.should = chai.should();
global.expect = chai.expect;


/*!
 * Chai Plugins
 */

//global.chai.use(require('chai-spies'));
chai.use(require('chai-http'));

// FAILS :(
require('superagent-proxy')(chai.request);

global.page = function (path) {
  var req = chai.request(R.base).get(path);
  return R.proxy ? req.proxy(R.proxy) : req;
};

global.external = function (url) {
  var req = chai.request('').get(url);
  return R.proxy ? req.proxy(R.proxy) : req;
};

/*!
 * Import project
 */

//global.chai.use(require('../..'));



/*chai.simple_get = function (path, callback) {
  var that = this;
  it("...", function (done) {
    that.get(path).end(function (err, res) {
      var page = res.text;

      callback(err, res, page, done);
    });
  });
  return that;
}*/
