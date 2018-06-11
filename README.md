
[![Build status][travis-img]][travis]  [![Code Climate][climate-img]][climate]
[![Issues][issues-img]][issues] ![][reposs]  [![Remote integration tests: status][test-img]][test]

# ou-media-player-test

Remote integration tests for [Open Media Player][omp], by IET at The Open University.

* <https://embed.open.ac.uk>

Note: this repository is an interim solution. Naturally, we want the tests in the same code-base as the Player.

Built on: [mocha], [chai], [chai-http] and [webdriver.io].


## Requirements

* A recent [node.js], including `npm`.


## Install

1. Clone the repo.
2. In a terminal type, `npm install && npm test`


## Proxy - pre-install

If you're behind a proxy then you may need to add this to your `~/.gitconfig` file before running `npm install`:

```
    # npm/apm proxy error
    # https://github.com/npm/npm/issues/5257
    # https://github.com/atom/apm/issues/106
    [url "https://"]
        insteadOf = git://
```


## Cron

At a terminal, type `crontab -e`:

```sh
# min hour dom mo dow  command

5 7,16 * * *  cd ... /dev_projects/ou-media-player-test ; make crontab >> $HOME/crontab.log 2>&1

#Was:  5 7,10,16 * * *  cd ...

#FAIL: 5 7,16 * * *  make -f ... /dev_projects/ou-media-player-test/Makefile crontab >> $HOME/crontab.log 2>&1
```


---
© 2016-2018 The Open University. ([Institute of Educational Technology][iet])

[omp]: https://iet-ou.github.io/open-media-player/
[omp-wiki]: https://github.com/IET-OU/open-media-player/wiki
[test]: http://iet-embed-acct.open.ac.uk/dev/ou-media-player-test/report/ "Remote integration tests: status"
[test-img]: http://iet-embed-acct.open.ac.uk/dev/ou-media-player-test/report/svg/

[iet]:     https://iet.open.ac.uk/
[node.js]: http://nodejs.org/
[mocha]:   http://mochajs.org/
[chai]:    http://chaijs.com/
[chai-http]: https://github.com/chaijs/chai-http
[webdriver.io]: http://webdriver.io/
[travis]:  https://travis-ci.org/nfreear/ou-media-player-test
[travis-img]: https://api.travis-ci.org/nfreear/ou-media-player-test.svg?branch=master "Build status"
[climate]: https://codeclimate.com/github/nfreear/ou-media-player-test
[climate-img]: https://codeclimate.com/github/nfreear/ou-media-player-test/badges/gpa.svg
[issues]: https://github.com/nfreear/ou-media-player-test/issues
[issues-img]: https://img.shields.io/github/issues/nfreear/ou-media-player-test.svg
[reposs]: https://reposs.herokuapp.com/?path=nfreear/ou-media-player-test
