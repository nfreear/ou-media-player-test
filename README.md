# ou-media-player-test

Remote unit tests for OU Media Player, at The Open University.

* <https://mediaplayer.open.ac.uk>

Note: this repository is an interim solution. Naturally, we want the tests in the same code-base as the Player.

Built on: [mocha], [chai] and [chai-http].


## Requirements

* A recent [node.js], including `npm`.


## Install

1. Clone the repo.
2. In a terminal type, `npm install && make test`


## Proxy - pre-install

If you're behind a proxy then you may need to add this to your `~/.gitconfig` file before running `npm install`:

```
    # npm/apm proxy error
    # https://github.com/npm/npm/issues/5257
    # https://github.com/atom/apm/issues/106
    [url "https://"]
        insteadOf = git://
```


---
© 2015 The Open University. [Institute of Educational Technology][iet].

[iet]:     http://iet.open.ac.uk/
[node.js]: http://nodejs.org/
[mocha]:   http://mochajs.org/
[chai]:    http://chaijs.com/
[chai-http]: https://github.com/chaijs/chai-http
