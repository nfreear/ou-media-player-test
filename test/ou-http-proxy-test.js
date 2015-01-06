/*!
  Testing the OU's proxy...

  NOTE: the "request" module works; "chai-http" fails!
*/

'use strict';

if (typeof require !== 'undefined') {
  var chai = require("chai")
    , chaiHttp = require('chai-http')
    , request = require('request')
    //, http = require("http")
    , R = require("../oump-test-config")
    ;
}

chai.use(chaiHttp);

var external_url = "https://www.google.co.uk/"
  , expect = chai.expect
  , should = chai.should()
  , proxy = chai.request(R.proxy_).get
  , __get = function (path, callback) {
    request(R.base + path, callback);
  };


describe("Test external site (proxy/no proxy)", function () {
  this.timeout(R.timeout);

  it(external_url, function (done) {

    request({ proxy: R.proxy, url: external_url }, function (error, res, doc) {

      expect(error).to.be.null;
      expect(res).to.not.be.null;

      res.statusCode.should.equal(200);
      //res.should.be.html;
      res.headers["content-type"].should.contain("text/html");

      doc.should.contain("<!");

      done();
    });
  });
});


describe("Test an external site (proxy) - chai-http", function () {
  this.timeout(R.timeout);

  it("ERROR: " + external_url, function (done) {

    proxy(external_url).end(function (err, res) {

      err.message.should.contain("ENOTFOUND");
      expect(err).to.be.null;

      done();
    });
  });
});
