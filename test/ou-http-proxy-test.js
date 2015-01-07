/*!
  Testing the OU's proxy...

  NOTE: the "request" module works; "chai-http" fails!
*/

'use strict';


describe("Test external site (proxy/no proxy)", function () {
  this.timeout(R.timeout);

  it(R.external_url, function (done) {

    request({ proxy: R.proxy, url: R.external_url }, function (error, res, doc) {

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

  it("ERROR: " + R.external_url, function (done) {

    proxy(R.external_url).end(function (err, res) {

      err.message.should.contain("ENOTFOUND");
      expect(err).to.be.null;

      done();
    });
  });
});
