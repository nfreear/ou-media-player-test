/*!
  Testing the OU's proxy...

  NOTE: the "request" module works; "chai-http" fails!
*/

'use strict';


describe("Test external site (proxy/no proxy) - request", function () {
  this.timeout(R.timeout);

  it(R.external_url, function (done) {

    request({ proxy: R.proxy, url: R.external_url }, function (error, res, doc) {

      expect(error).to.be.a('null');
      expect(res).to.be.an('object');

      res.statusCode.should.equal(200);
      //res.should.be.html;
      res.headers["content-type"].should.contain("text/html");

      doc.should.contain("<!");

      delay(done);
    });
  });
});


describe("Test an external site (proxy/no proxy) - chai-http", function () {
  this.timeout(R.timeout);

  it(R.external_url, function (done) {

    external(R.external_url).end(function (err, res) {
      var doc = res && res.text;

      //err.message.should.contain("ENOTFOUND");
      expect(err).to.be.a('null');
      expect(res).to.be.an('object');
      res.should.have.contentType('html');
      res.should.contain("Google");

      delay(done);
    });
  });
});
