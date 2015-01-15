/*!
  OU Media Player - API tests..
*/

describe("Test OU Media Player API", function () {
  this.timeout(R.timeout);

  it("Timed text / WEBVTT", function (done) {

    page("/timedtext/webvtt?url=" + R.podcast +
        "/feeds/student-experiences/closed-captions/" +
        "openings-being-an-ou-student.xml").end(function (err, res) {
      var doc = res && res.text;
      //console.log("WEBVTT: " + doc);

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

});