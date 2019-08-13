SOURCES = lib/**/*.js

# ==============================================================================
# Node Tests
# ==============================================================================

MOCHA = ./node_modules/.bin/mocha
TESTS ?= test/*-test.js

test:
	@NODE_ENV=test NODE_PATH=lib $(MOCHA) $(TESTS)

# ==============================================================================
# Static Analysis
# ==============================================================================

JSHINT = jshint

hint: lint
lint:
	$(JSHINT) $(SOURCES)


.PHONY: test hint lint
