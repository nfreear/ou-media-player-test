/*!
  Test error handling by OU media Player...
*/

describe("Test OU Media Player - error handling:", function () {
  'use strict';

  this.timeout(R.timeout);

  it("1. ...Should give an HTTP 400 Bad Request - shortcode", function (done) {
    page("/embed/pod/student-experiences/400_Bad_shortcode").end(function (err, res) {
      var doc = res && res.text;

      expect(err).to.be.an('error');
      //expect(err.error.badRequest).to.equal(true);
      expect(res).to.be.an('object');  //Was: .not.be.null;

      res.should.be.utf8();
      res.should.have.charset('utf-8');
      res.should.have.contentType('html');  //Was: res.should.be.html;

      res.statusCode.should.equal(400);
      doc.should.contain("I expect a 10 character shortcode");

      delay(done);
    });
  });


  it("2. ...Should give an HTTP 404 Not Found - collection", function (done) {
    page("/embed/pod/404_Bad_collection/db6cc60d6b").end(function (err, res) {
      var doc = res && res.text;

      expect(err).to.be.an('error');
      expect(res).to.be.an('object');

      res.statusCode.should.equal(404);
      doc.should.contain("Podcast data collection deleted or not found");

      delay(done);
    });
  });


  it("3. ...Should give an HTTP 404 not found - page.", function (done) {
    page("/404_Not_Found").end(function (err, res) {
      var doc = res && res.text;

      expect(err).to.be.an('error');
      expect(res).to.be.an('object');

      res.statusCode.should.equal(404);
      doc.should.contain("404 Page Not Found");

      delay(done);
    });
  });

  /* jshint -W027 */

  return;

  it("4. ...Should give a PHP notice.", function (done) {
    page("/test/PHP_error_test").end(function (err, res) {
      var doc = res && res.text;

      expect(err).to.be.a('null');
      expect(res).to.not.be.a('null');

      res.statusCode.should.equal(404); // 200 ?

      doc.should.contain("error-php");
      doc.should.contain("A PHP Error was encountered");
      doc.should.contain("Severity:");

      delay(done);
    });
  });

  /* jshint +W027 */

});
