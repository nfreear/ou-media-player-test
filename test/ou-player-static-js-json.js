
describe("Test OU Media Player - static json & javascript etc.", function () {
  this.timeout(R.timeout);

  it("#page: should contain version.json", function (done) {

    page("/version.json").end(function (err, res) {
      var doc = res && res.text;
      log("version.JSON: " + doc);

      expect(err).to.be.null;
      expect(res).to.not.be.null;

      res.should.have.a.status(200);
      res.should.be.json;

      doc.should.match(/^\{\"/);
      doc.should.contain('"commit":');

      delay(done);
    });
  });


  it("#page: should contain jquery.js >= 1.9.x", function (done) {

    page("/engines/mediaelement/build/jquery.js").end(function (err, res) {
      var doc = res && res.text;

      expect(err).to.be.null;
      expect(res).to.not.be.null;

      res.should.have.a.status(200);
      //res.should.be.javascript;
      res.headers["content-type"].should.contain("text/javascript");

      doc.should.match(/^\/\*\!/);
      doc.should.contain('core_version = "1.9.1",');

      delay(done);
    });
  });

});