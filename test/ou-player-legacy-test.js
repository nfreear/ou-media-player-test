/*!
  Legacy!

  BDD, Behaviour-driven development.
  @link http://chaijs.com/api/bdd/
*/

'use strict';

/*before(function () {
  console.log("before");
});*/

describe("Test OU Media Player - legacy tests", function () {
  this.timeout(R.timeout);

  it("...Should return a 200 code, and contain...", function (done) {

    request(R.base + "/embed/pod/student-experiences/db6cc60d6b",
        function (error, res, doc) {

      expect(error).to.equal.null;
      expect(res).to.not.equal.null;
      expect(res.statusCode).to.equal(200);

      res.headers["content-type"].should.contain("text/html");
      //expect(doc).to.match(/^<!doctype/);
      //expect(doc).to.not.contain("error-php");
      doc.should.contain/*.htmlClass*/("mtype-video");

      //expect(rosie.contentType()).to.equal("text/html");

      delay(done);
    });
  });
});



// https://github.com/michael/github/blob/master/test/auth_test.js
//End.
