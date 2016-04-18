
describe("Test OU Media Player - restricted-access players", function () {
  'use strict';

  this.timeout(R.timeout);

  it("#page: should contain html, a link to log in & specific classes", function (done) {

//http://embed.open.ac.uk/oembed?format=json&url=http%3A//podcast.open.ac.uk/pod/learn-about-fair-2009%23%210a49a38de2&theme=oup-light&callback=jsonp1420555891885
    page("/embed/pod/learn-about-fair-2009/0a49a38de2").end(function (err, res) {
      var doc = res && res.text;

      expect(err).to.be.a('null');
      expect(res).to.not.be.a('null');

      res.should.have.a.status(200);
      res.should.have.contentType('html');

      expect(doc).to.match(/^<!doctype/);
      doc.should.not.contain('error-php');

      doc.should.contain('access-intranet');
      doc.should.contain('restrict-text');
      doc.should.contain('https://msds.open.ac.uk/signon/');
      doc.should.contain("'Learn About' New Technologies");

      delay(done);
    });
  });

});
