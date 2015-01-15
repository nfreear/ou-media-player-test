/*!
  Test RSS feeds from OU Podcasts...

  NOTE: fails using "chai-http" - "Ranges" headers/chunking?
*/

'use strict';


describe("Test OU Podcasts ...", function () {
  this.timeout(R.timeout);

  it("#page: should contain an rss feed & return a 200 status", function (done) {

    request(R.podcast + "/feeds/student-experiences/player.xml",
        function (error, res, doc) {
      log('    > Path: ' + res.request.href); //res.req.path, res);

      expect(error).to.be.null;
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

});
