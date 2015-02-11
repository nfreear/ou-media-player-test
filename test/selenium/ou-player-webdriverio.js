/*!

*/

var webdriverio = require('webdriverio')
  , browserevent = require('browserevent')
  , play_btn = '#mep_0 .mejs-playpause-button button';

describe('My webdriverio tests', function () {

  var client = {};

  this.timeout(99999999);

  before(function (done) {
    client = webdriverio.remote({
      desiredCapabilities: { browserName: 'chrome' } });

    browserevent.init(client);

    client.init(done);
  });

  it('OU Media Player test', function (done) {
    client
      .url(R.base + "/embed/pod/student-experiences/db6cc60d6b")
      .getTitle(function (err, title) {
        expect(err).to.be.undefined;
        //assert.strictEqual(title,'GitHub · Build software better, together.');
        expect(title).to.equal('The Student Experience: Student views of the OU | OU player');
      })
      .waitForExist(play_btn, 2000, function () {

        console.log('> Element exists (play-pause button):', play_btn);

        client
          .element('video#player1', function (err, res) {
            expect(err).to.be.null;  //.undefined;
            expect(res.state).to.equal('success');

            console.log('> Element exists (<video>):', res);
          })
          .addEventListener('play', '#player1', function (ev) {
            console.log('> Event:', ev.type);
          })
          .addEventListener('pause', 'video#player1', function (ev) {
            console.log('> Event:', ev.type);
          })
          .addEventListener('click', play_btn, function (ev) {
            expect(ev.type).to.equal('click');
            expect(ev.target).to.contain('id("mep_0")');

            console.log('> Event:', ev.type); // -> 'click'
            console.log('> ', ev.target); // -> 'id("mep_0")/div[@class="mejs-inner"]/...'
            console.log('>', ev.clientX, ev.clientY); // -> 239 524
          })
          .click(play_btn) // triggers event
          .pause(6000, function () {

            client.click(play_btn);
        
            console.log('> Pause');

            done();
          });
      });

  });


  after(function (done) {
    client.pause(2000, function () {
      client.end(done);

      console.log('> End');
    });
  });
});
