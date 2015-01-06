/*!
  Test RSS feeds from OU Podcasts...

  NOTE: fails using "chai-http" - "Ranges" headers/chunking?
*/

'use strict';

if (typeof require !== 'undefined') {
  var chai = require("chai")
    , request = require("request")
    , R = require("../oump-test-config")
    ;
}

var expect = chai.expect
  , should = chai.should()
  ;


describe("Testing OU Podcasts ...", function () {
  this.timeout(R.timeout);

  it("...Should return a 200 code and contain an RSS feed", function (done) {

    request(R.podcast + "/feeds/student-experiences/player.xml",
        function (error, res, doc) {
      //console.log(res);

      expect(error).to.be.null;
      res.statusCode.should.equal(200);
      //res.should.be.xml;
      res.headers["content-type"].should.contain("application/xml");

      doc.should.contain('<?xml version="1.0" encoding="UTF-8"?>');
      doc.should.contain("<rss xmlns:");
      doc.should.contain("<channel>");

      done();
    });
  });
});
