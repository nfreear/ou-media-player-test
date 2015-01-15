/*!
  OU Media Player - API tests..
*/

describe("Test OU Media Player API", function () {
  this.timeout(R.timeout);

  it("#page: should contain valid timed text / webvtt", function (done) {

    page("/timedtext/webvtt?url=" + R.podcast +
        "/feeds/student-experiences/closed-captions/" +
        "openings-being-an-ou-student.xml").end(function (err, res) {
      var doc = res && res.text;
      log("WEBVTT: " + doc);

      expect(err).to.be.null;
      expect(res).to.not.be.null;

      res.should.have.a.status(200);
      res.headers["content-type"].should.contain("text/vtt");

      doc.should.match(/^WEBVTT/);
      doc.should.match(/00:00:\d\d\.\d{3} --> 00:00:\d/);

      doc.should.not.contain("error-php");

      delay(done);
    });
  });

  it("#page: should contain a jquery.oembed.js plugin (via php)", function (done) {

    page("/scripts/jquery.oembed.js").end(function (err, res) {
      var doc = res && res.text;

      expect(err).to.be.null;
      expect(res).to.not.be.null;

      res.should.have.a.status(200);
      res.headers["content-type"].should.contain("application/x-javascript");
/*
      doc.should.match(/^\/\*--/);
      doc.should.contain("//ou-specific");
      doc.should.contain("new $.fn.oembed.OEmbedProvider('oupodcast',");

      doc.should.not.contain("error-php");
*/
      delay(done);
    });
  });

});