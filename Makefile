C_SRC=./src/*.c
TS_SRC=./src/**/*.ts
DIST=./dist
EXECUTABLE=./dist/boo

CC=gcc
CFLAGS=-Wall
TSC=./node_modules/.bin/tsc
JEST=./node_modules/.bin/jest
TSLINT=./node_modules/.bin/tslint

build: build_c build_ts

build_c: $(DIST) $(C_SRC)
	$(CC) $(CFLAGS) $(C_SRC) -o $(EXECUTABLE)

build_ts: $(DIST) $(TS_SRC)
	$(TSC)

watch: $(DIST) $(TS_SRC)
	$(TSC) --watch

$(DIST):
	mkdir -p $(DIST)

test:	test_c test_ts

test_c: build_c
	$(EXECUTABLE)

test_ts:
	$(JEST)

lint: $(TS_SRC)
	$(TSLINT) $(TS_SRC)

clean:
	rm -rf $(DIST)

.PHONY: build dist test_c test_ts test clean
