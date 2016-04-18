/*!
 * OU Media Player - test bootstrap.
 */

'use strict';

var R = global.R = require('./test-config');

global.request = require('request');
global.rss_parser = require("parse-rss");

/*! Attach ES6 Shim.
 */
if (typeof Promise === 'undefined') {
  //require('es6-shim');
}

/*! Attach chai to global should.
 */

var chai = global.chai = require('chai');

global.should = chai.should();
global.expect = chai.expect;

/*! Chai Plugins.
 */

require('./chai-http-extend');

//global.chai.use(require('chai-spies'));
chai.use(require('chai-http'));

// Now succeeds ;) [Bug: #4]
require('superagent-proxy')(chai.request);


/*! Helpers and wrappers.
*/

global.page = function (path) {
  log('    > Path: ' + path);
  var req = chai.request(R.base).get(path).set('User-Agent', R.agent);
  return R.proxy ? req.proxy(R.proxy) : req;
};

global.external = function (url) {
  log('    > Path: ' + url);
  var req = chai.request('').get(url).set('User-Agent', R.agent);
  return R.proxy ? req.proxy(R.proxy) : req;
};

var temporal = require('temporal')
  , count = 0
  , dt_start = new Date();

global.delay = function (done_callback) {
  var dt_end = new Date();

  count++;

  log('    > Delay: ' + count + ' * ' + R.delay,
    '| Elapsed: ' + (dt_end - dt_start) + ' ms');

  dt_start = dt_end;

  if (!R.delay) {
    return done_callback();
  }

  temporal.delay(count * R.delay, function () {
    done_callback();
  });
};


/*! Debug helper.
*/

if (R.debug) {
  global.log = console.log;
} else {
  global.log = function () {};
}

if (R.is_json) {
  console.warn('>> Base: ' + R.base);
} else {
  console.log('>> Base: ' + R.base);
}


/*! Import project
 */

//global.chai.use(require('../..'));
