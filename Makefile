#
# OU Media Player - test Makefile.
#
# Example:  OUMP_NP=1 make test

ifdef OUMP_NP
    GLOBALS=noproxy,
else
    GLOBALS=
endif

MOCHA = NODE_ENV=test ./node_modules/.bin/mocha \
    --require ./test/bootstrap \
    --reporter spec \
    --globals $(GLOBALS)base
TESTS = test/ou-p*.js



help:
	# Test OU Media Player. Available targets:
	#
	#	test, test-proxy, test-debug, test-it-player-acct, test-it-player-live
	@echo

test: test-iet-embed-acct


test-proxy:
	$(MOCHA)=http://iet-embed-acct.open.ac.uk  test/*-proxy-*.js

test-debug:
	$(MOCHA)=http://iet-embed-acct.open.ac.uk,debug $(TESTS)


# IT-EUD hosting.
test-it-player-acct:
	$(MOCHA)=https://mediaplayer-acct.open.ac.uk $(TESTS)

test-it-player-live:
	$(MOCHA)=https://mediaplayer.open.ac.uk $(TESTS)

# IET hosting.
test-iet-embed-acct:
	$(MOCHA)=http://iet-embed-acct.open.ac.uk $(TESTS)

test-iet-embed-live:
	$(MOCHA)=http://embed.open.ac.uk $(TESTS)


mocha-help:
	$(MOCHA)=1 --help

.PHONY: help test test-it-player-acct test-it-player-live test-iet-embed-acct test-iet-embed-live mocha-help

#End.
