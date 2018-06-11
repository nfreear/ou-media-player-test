/*!
  OU Media Player - API tests..
*/

describe('Test OU Media Player - API, generated Javascript etc.', function () {
  'use strict';

  // console.log('config (R):', R);

  this.timeout(R.timeout);

  it('#page: should contain a valid oembed json-p response (via php)', function (done) {
    page('/oembed?format=json&callback=CB&url=' + R.podcast +
      '/pod/student-experiences/db6cc60d6b').end(function (err, res) {
      var doc = res && res.text,
        // Parse JSON [Bug: #7]
        json = doc && doc.replace(/^CB\(/, '').replace(/\)$/, ''),
        obj = json && JSON.parse(json);
      // log("oEmbed JSON: " + doc);

      expect(err).to.be.a('null');
      expect(res).to.be.an('object'); // .not.be.a('null');

      res.should.have.status(200);
      res.should.be.utf8();
      res.should.have.contentType('javascript');
      // I don't care! ~ res.headers.should.not.have.property("x-powered-by");
      /* res
        .headers.should.not.have.property("x-powered-by")
        .or
        .headers["x-powered-by"].should.not.contain("PHP/");
      */
      res.headers.server.should.not.match(/\d\.\d/); // (/Apache/i)

      doc.should.match(/^CB\(\{\n/); // Now pretty printed!
      doc.should.contain('"version": "1.0"');
      doc.should.contain('"html": "<iframe ');

      expect(obj.version).to.equal('1.0');
      expect(obj.type).to.equal('video');
      expect(obj.html).to.contain('<iframe');

      delay(done);
    });
  });

  it('#page: should contain valid timed text / webvtt (via php)', function (done) {
    page('/timedtext/webvtt?url=' + R.podcast +
        '/feeds/student-experiences/closed-captions/' +
        'openings-being-an-ou-student.xml').end(function (err, res) {
      var doc = res && res.text;
      log('WEBVTT: ' + doc);

      expect(err).to.be.a('null');
      expect(res).to.be.an('object');

      res.should.have.a.status(200);
      res.should.have.contentType('text/vtt');

      doc.should.match(/^WEBVTT/);
      doc.should.match(/00:00:\d\d\.\d{3} --> 00:00:\d/);

      doc.should.not.contain('error-php');

      delay(done);
    });
  });

  it('#page: should contain a jquery.oembed.js plugin (via php)', function (done) {
    page('/scripts/jquery.oembed.js').end(function (err, res) {
      var doc = res && res.text;

      expect(err).to.be.a('null');
      expect(res).to.be.an('object');

      res.should.have.a.status(200);
      res.headers['content-type'].should.contain('application/x-javascript');
      /*
      doc.should.match(/^\/\*--/);
      doc.should.contain('//ou-specific');
      doc.should.contain("new $.fn.oembed.OEmbedProvider('oupodcast',");

      doc.should.not.contain('error-php');
      */
      delay(done);
    });
  });
});
