#
# OU Media Player - test Makefile.
#
# Example:  OUMP_NP=1 make test

NOPROXY =
ifdef OUMP_NP
    NOPROXY = noproxy,
endif

REPORTER = spec
ifdef OUMP_RT
    REPORTER = $(OUMP_RT)
endif

GREP =
ifdef OUMP_RE
    GREP = --grep $(OUMP_RE)
endif

MOCHA = NODE_ENV=test ./node_modules/.bin/mocha \
    --require ./test/bootstrap \
    --reporter $(REPORTER) $(GREP) \
    --globals $(NOPROXY)base
TESTS = test/ou-p*.js
OUT = _out/



help:
	# Remote tests for OU Media Player. Available targets:
	#
	#	test, test-proxy, test-debug, test-it-player-acct, test-it-player-live,  mocha-help, crontab
	@echo

test: test-iet-embed-acct

crontab: sanity-check
	- OUMP_RT=spec make test-iet-embed-acct > $(OUT)report-spec.txt
	- OUMP_RT=json make test-iet-embed-acct > $(OUT)report.json
	rm -f $(OUT)doc.html
	cp report/doc-tpl.html $(OUT)doc.html
	- OUMP_RT=doc  make test-iet-embed-acct >> $(OUT)doc.html

test-api:
	$(MOCHA)=http://iet-embed-acct.open.ac.uk test/*-api.js

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
	@$(MOCHA)=http://iet-embed-acct.open.ac.uk $(TESTS)

test-iet-embed-live:
	$(MOCHA)=http://embed.open.ac.uk $(TESTS)


mocha-help:
	@$(MOCHA)=1 --help
	## Reporters:
	@$(MOCHA)=1 --reporters

sanity-check:
	@rm -f $(OUT)version.json
	@wget -v -P $(OUT) http://iet-embed-acct.open.ac.uk/version.json
	#more $(OUT)version.json

.PHONY: help test test-it-player-acct test-it-player-live test-iet-embed-acct test-iet-embed-live mocha-help crontab

#End.
