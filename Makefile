#
# OU Media Player - test Makefile.
#
# Example:  OUMP_NP=1 make test

NOPROXY =
ifdef OUMP_NP
    NOPROXY = noproxy,
endif

DELAY =
ifdef OUMP_DELAY
    DELAY = delay=$(OUMP_DELAY),
endif

MOCHA = NODE_ENV=test ./node_modules/.bin/mocha \
    --require ./test/bootstrap \
    --reporter spec \
    --globals $(NOPROXY)$(DELAY)base
TESTS = test/ou-p*.js



help:
	# Test OU Media Player. Available targets:
	#
	#	test, test-proxy, test-debug, test-it-player-acct, test-it-player-live
	@echo

test: test-iet-embed-acct

#test-delay:
#	$(MOCHA)=http://iet-embed-acct.open.ac.uk  test/delay-test.js

test-one:
	$(MOCHA)=http://iet-embed-acct.open.ac.uk --grep=embed test/ou-player-test.js

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

sanity-check:
	wget -v -P _dev/ http://iet-embed-acct.open.ac.uk/version.json
	more _dev/version.json
	#- sleep 1

.PHONY: help test test-it-player-acct test-it-player-live test-iet-embed-acct test-iet-embed-live mocha-help

#End.
