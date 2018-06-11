/*!
  OU Media Player - OpenLearn legacy media tests.

http://www.open.edu/openlearn/science-maths-technology/mathematics-and-statistics/statistics/the-joy-stats-200-countries-200-years-4-minutes
*/


describe("Test OU Media Player - OpenLearn legacy media player", function () {
  'use strict';

  this.timeout(R.timeout);

  it("#page: should contain html, specific classes (openlearn video) & return a 200 status", function (done) {

    page("/embed/openlearn?title=The+Joy+Of+Stats%3A+200+countries+200+years+4" +
      "+minutes&media_url=http%3A//podcast.open.ac.uk/open2media%2Fjoyofstats" +
      "/joy6.flv&lang=en-G&caption_url=&image_url=http%3A//podcast.open.ac.uk/" +
      "open2media%2Fjoyofstats%2Fjoy6.jpg").end(function (err, res) {
      var doc = res && res.text;

      expect(err).to.be.a('null');
      expect(res).to.be.an('object');
      res.should.have.a.status(200);
      res.should.have.contentType('html');

      expect(doc).to.match(/^<!doctype/);
      doc.should.not.contain("error-php");

      doc.should.contain(
        "https://unpkg.com/jquery@3.2.1/dist/jquery.min.js");

      doc.should.contain/*.htmlClass*/("mtype-video");
      doc.should.contain/*.htmlClass*/("ctx-Openlearn_Player");
      doc.should.contain/*.htmlElement*/("<video");
      doc.should.contain("mejs.MediaElementPlayer");

      doc.should.contain("<title>The Joy Of Stats: 200 countries 200");
      doc.should.contain('"//podcast.open.ac.uk/open2media/joyofstats/joy6.flv"');

      delay(done);
    });
  });

});
