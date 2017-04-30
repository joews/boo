C_SRC=./src/native/*.c
TS_SRC=./src/**/*.ts
C_TEST_SRC=./src/native/__tests__/*.c
DIST=./dist
EXECUTABLE=./dist/boo
TEST_EXECUTABLE=./dist/boo-test

CC=gcc
CFLAGS=-Wall
TSC=./node_modules/.bin/tsc
JEST=./node_modules/.bin/jest
TSLINT=./node_modules/.bin/tslint

build: build_c build_ts

build_c: $(DIST) $(C_SRC)
	$(CC) $(CFLAGS) $(C_SRC) -o $(EXECUTABLE)

build_c_test: $(DIST) $(C_SRC) $(C_TEST_SRC)
	$(CC) $(CFLAGS) $(C_SRC) $(C_TEST_SRC) -o $(TEST_EXECUTABLE)

build_ts: $(DIST) $(TS_SRC)
	$(TSC)

watch: $(DIST) $(TS_SRC)
	$(TSC) --watch

$(DIST):
	mkdir -p $(DIST)

test:	test_c test_ts

test_c: build_c_test
	$(TEST_EXECUTABLE)

test_ts:
	$(JEST)

lint: $(TS_SRC)
	$(TSLINT) $(TS_SRC)

clean:
	rm -rf $(DIST)

.PHONY: build dist test_c test_ts test clean
