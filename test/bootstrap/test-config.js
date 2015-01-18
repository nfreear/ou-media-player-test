/*!
  OU Media Player - test configuration.
*/

var argv = require('minimist')(process.argv.slice(2));

var debug = argv.globals && argv.globals.match(/debug/);

var base_url = argv.globals && argv.globals.match(/base=([^,]+)/);
base_url = (base_url && base_url[1]) || "http://iet-embed-acct.open.ac.uk";

var noproxy = argv.globals && argv.globals.match(/noproxy/);

var delay = argv.globals && argv.globals.match(/delay=(\d+)/);

var R = module.exports = {
  debug: debug ? true : false,
  mode: "queue-fork",  // By default, add to queue and fork, in server mode.
  base: base_url,
  podcast: "https://podcast.open.ac.uk",
  proxy:  noproxy ? null : "http://wwwcache.open.ac.uk:80",
  proxy_: noproxy ? null : "http://wwwcache.open.ac.uk",
  external_url: "https://www.google.co.uk/",
  mailto: [ "nfreear@yahoo.co.uk" ],
  agent: '@nfreear/ou-media-player-test',
  reporter: argv.reporter || 'spec',
  is_json: 'json' === argv.reporter,
  timeout: 12000,  // Milliseconds.
  delay: delay ? delay[1] : 150  // Wait X milli-seconds between requests - play nice, like any robot should!
};
R.debug = R.debug && !R.is_json;


if (R.debug) {
  console.log("Argv: ", argv);
  console.log("\nConfiguration: ", R);
}
