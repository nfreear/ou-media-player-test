/*!
 * OU Media Player - test bootstrap.
 */

var R = global.R = require('../../oump-test-config');
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


global.page = chai.request(R.base).get;
global.proxy = chai.request(R.proxy_).get;


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
