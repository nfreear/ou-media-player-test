/*!
  OU Media Player - tests with "chai-http".

  @link http://chaijs.com/plugins/chai-http
*/

describe("Test OU Media Player - embedded podcast players", function () {
  'use strict';

  this.timeout(R.timeout);

  it("#page: should contain html, specific classes (podcast video) & return a 200 status", function (done) {

    page("/embed/pod/student-experiences/db6cc60d6b").end(function (err, res) {
      var doc = res && res.text;

      expect(err).to.be.a('null');
      expect(res).to.be.an('object');  //Was: .not.be.null;
      //expect(resp.statusCode, "HTTP status code").to.equal(200);
      res.should.have.a.status(200);
      res.should.have.contentType('html');  //Was: res.should.be.html;
      res.should.be.utf8();

      expect(doc).to.match(/^<!doctype/);
      doc.should.not.contain("error-php");

      //doc.should.contain("<!doctype");
      doc.should.contain(
        "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js");

      doc.should.contain/*.htmlClass*/("mtype-video");
      doc.should.contain/*.htmlClass*/("ctx-Podcast_Player");
      doc.should.contain/*.htmlElement*/("<video");
      doc.should.contain("mejs.MediaElementPlayer");

      delay(done);
    });
  });


  it("#page: should contain html, specific classes (podcast audio) & return a 200 status", function (done) {

    page("/embed/pod/l314-spanish/fe481a4d1d").end(function (err, res) {
      var doc = res && res.text;

      expect(err).to.be.a('null');
      expect(res).to.be.an('object');
      res.should.have.a.status(200);
      res.should.have.contentType('html');

      doc.should.contain("<!doctype");
      doc.should.contain(
        "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js");

      doc.should.contain/*.htmlClass*/("mtype-audio");
      doc.should.contain/*.htmlClass*/("ctx-Podcast_Player");
      doc.should.contain/*.htmlElement*/("<audio");
      doc.should.contain("mejs.MediaElementPlayer");

      delay(done);
    });
  });

});
