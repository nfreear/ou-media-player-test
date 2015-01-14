/*!
  Test error handling by OU media Player...
*/


describe("Test OU Media Player - error handling:", function () {
  this.timeout(R.timeout);

  it("1. ...Should give an HTTP 400 Bad Request - shortcode", function (done) {
    page("/embed/pod/student-experiences/400_Bad_shortcode").end(function (err, res) {
      var doc = res && res.text;

      expect(err).to.equal.null;
      expect(res).to.not.equal.null;

      res.statusCode.should.equal(400);
      doc.should.contain("I expect a 10 character shortcode");

      delay(done);
    });
  });


  it("2. ...Should give an HTTP 404 Not Found - collection", function (done) {
    page("/embed/pod/404_Bad_collection/db6cc60d6b").end(function (err, res) {
      var doc = res && res.text;

      expect(err).to.equal.null;
      expect(res).to.not.equal.null;

      res.statusCode.should.equal(404);
      doc.should.contain("Podcast data collection deleted or not found");

      delay(done);
    });
  });


  it("3. ...Should give an HTTP 404 not found - page.", function (done) {
    page("/404_Not_Found").end(function (err, res) {
      var doc = res && res.text;

      expect(err).to.equal.null;
      expect(res).to.not.equal.null;

      res.statusCode.should.equal(404);
      doc.should.contain("404 Page Not Found");

      delay(done);
    });
  });

  return;


  it("4. ...Should give a PHP notice.", function (done) {
    page("/test/PHP_error_test").end(function (err, res) {
      var doc = res && res.text;

      expect(err).to.equal.null;
      expect(res).to.not.equal.null;

      res.statusCode.should.equal(404); // 200 ?

      doc.should.contain("error-php");
      doc.should.contain("A PHP Error was encountered");
      doc.should.contain("Severity:");

      delay(done);
    });
  });

});
