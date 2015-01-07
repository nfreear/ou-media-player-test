#
# OU Media Player - test Makefile.
#

MOCHA = @NODE_ENV=test ./node_modules/.bin/mocha \
    --require ./test/bootstrap \
    --reporter spec \
    --globals base
TESTS = test/ou-p*.js



test: test-iet-embed-acct


# IT-EUD hosting.
test-it-mediaplayer-acct:
	$(MOCHA)=https://mediaplayer-acct.open.ac.uk $(TESTS)

test-it-mediaplayer-live:
	$(MOCHA)=https://mediaplayer.open.ac.uk $(TESTS)

# IET hosting.
test-iet-embed-acct:
	$(MOCHA)=http://iet-embed-acct.open.ac.uk $(TESTS)

test-iet-embed-live:
	$(MOCHA)=http://embed.open.ac.uk $(TESTS)


.PHONY: test test-it-mediaplayer-acct test-it-mediaplayer-live test-iet-embed-acct test-iet-embed-live

#End.
