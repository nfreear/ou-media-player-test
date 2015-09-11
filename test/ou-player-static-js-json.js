
describe("Test OU Media Player - static json & javascript etc.", function () {
  this.timeout(R.timeout);

  it("#page: should contain version.json", function (done) {

    page("/version.json").end(function (err, res) {
      var doc = res && res.text
        // Semantic Versioning, http://semver.org/#!spec-section-9 [Bug: #11]
        , OLD_ver_regex = /^v?\d\.\d+(\-alpha|\-beta|\-rc)?\-\d+\-g\w{7}$/
        , sem_ver_regex = /^v?\d+\.\d+(\-(alpha|beta|rc)(\.\d)?)?(\-\d+\-g\w{7})?$/
        // Parse JSON [Bug: #7]
        , obj = doc && JSON.parse(doc);
      log("version.JSON: " + obj);

      expect(err).to.be.null;
      expect(res).to.not.be.null;

      res.should.have.a.status(200);
      res.should.be.json;

      doc.should.match(/^\{\"/);
      doc.should.contain('"commit":');

      expect(obj).to.have.property("describe");
      expect(obj.describe).to.match(sem_ver_regex);

      expect("v1.1").to.match(sem_ver_regex);
      expect("12.34-rc.5").to.match(sem_ver_regex);
      expect("A.B").to.not.match(sem_ver_regex);

      delay(done);
    });
  });


  it("#page: should contain jquery.js >= 1.9.x", function (done) {

    page("/engines/mediaelement/build/jquery.js").end(function (err, res) {
      var doc = res && res.text;

      expect(err).to.be.null;
      expect(res).to.not.be.null;

      res.should.have.a.status(200);
      //res.should.be.javascript;
      res.headers["content-type"].should.contain("text/javascript");

      doc.should.match(/^\/\*\!/);
      doc.should.contain('core_version = "1.9.1",');

      delay(done);
    });
  });

});
