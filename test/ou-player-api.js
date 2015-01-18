/*!
  OU Media Player - API tests..
*/

describe("Test OU Media Player - API, generated Javascript etc.", function () {
  this.timeout(R.timeout);

  it("#page: should contain a valid oembed json-p response (via php)", function (done) {

    page("/oembed?format=json&callback=CB&url=" + R.podcast +
      "/pod/student-experiences/db6cc60d6b").end(function (err, res) {
      var doc = res && res.text;
      //log("oEmbed JSON: " + doc);

      expect(err).to.be.null;
      expect(res).to.not.be.null;

      res.should.have.a.status(200);
      //res.should.be.javascript;
      //res.should.be.utf8;
      res.headers["content-type"].should.contain("text/javascript");
      expect(res).to.have.header('content-type', /text\/javascript/);
      res.headers.should.not.have.property("x-powered-by");
      /*res
        .headers.should.not.have.property("x-powered-by")
        .or
        .headers["x-powered-by"].should.not.contain("PHP/");
      */
      res.headers["server"].should.not.match(/\d\.\d/);  //(/Apache/i)

      doc.should.match(/^CB\(\{"/);
      doc.should.contain('"version":"1.0"');
      doc.should.contain('"html":"<iframe ');

      delay(done);
    });
  });

  it("#page: should contain valid timed text / webvtt (via php)", function (done) {

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