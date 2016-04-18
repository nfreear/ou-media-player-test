/*!
  Test RSS feeds from OU Podcasts...

  NOTE: fails using "chai-http" - "Ranges" headers/chunking?
*/


describe("Test OU Podcasts - RSS feed API, etc.", function () {
  'use strict';

  this.timeout(R.timeout);

  it("#page: should contain an rss feed & return a 200 status", function (done) {

    request(R.podcast + "/feeds/student-experiences/player.xml",
        function (err, res, doc) {
      log('    > Path: ' + res.request.href); //res.req.path, res);

      expect(err).to.be.a('null');
      expect(res).to.not.be.a('null');
      res.statusCode.should.equal(200);
      //res.should.be.xml;
      res.headers["content-type"].should.contain("application/xml");

      doc.should.contain('<?xml version="1.0" encoding="UTF-8"?>');
      doc.should.contain('xmlns:atom="http://www.w3.org/2005/Atom"');
      doc.should.contain('xmlns:oup="http://podcast.open.ac.uk/2012"');
      doc.should.contain("<rss xmlns:");
      doc.should.contain("<channel>");

      doc.should.match(/<oup:private>[01]/);      //channel
      doc.should.match(/<oup:aspect_ratio>0.\d/); //item
      doc.should.match(/<oup:published_flag>[01]/);
      doc.should.match(/<atom:link [^>]+oup:transcript/);
      doc.should.contain("application/ttml+xml");
      doc.should.contain("http://purl.org/steeple/course");

      delay(done);
    });
  });


  it("#page: should be a valid rss feed (parser)", function (done) {

    // Parse RSS feed [Bug: #7]
    rss_parser(R.podcast + "/feeds/student-experiences/player.xml", function (err, rss) {
      var meta = rss[0].meta;
      //console.log("RSS: ", rss);

      expect(err).to.be.a('null');
      //rss.statusCode.should.equal(200);
      expect(meta.title).to.contain("The Student Experience");
      expect(rss[0].title).to.contain("Student views of the OU");

      delay(done);
    });

  });

});
