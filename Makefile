C_SRC=$(wildcard ./src/native/*.c)
C_OBJ=$(C_SRC:.c=.o)

C_SRC_TEST=$(wildcard ./src/native/__tests__/*.c)
C_OBJ_TEST=$(C_SRC_TEST:.c=.o)

TS_SRC=./src/**/*.ts
DIST=./dist
EXECUTABLE=$(DIST)/boo
TEST_EXECUTABLE=./dist/boo-test

CC=gcc
CFLAGS=-Wall
LDFLAGS=

TSC=./node_modules/.bin/tsc
TSNODE=./node_modules/.bin/ts-node
JEST=./node_modules/.bin/jest
TSLINT=./node_modules/.bin/tslint

build: build_ts $(EXECUTABLE)

$(EXECUTABLE): $(C_OBJ)
	$(CC) -o $@ $^ $(LDFLAGS)

$(TEST_EXECUTABLE): ./src/native/interpret.o $(C_OBJ_TEST)
	$(CC) -o $@ $^ $(LDFLAGS)

./src/native/interpret.c: ./src/native/opcodes.h

./src/native/opcodes.h: ./src/boo.instructions
	$(TSNODE) ./src/build/gen-c-opcodes.ts $@

build_ts: $(TS_SRC)
	$(TSC)

watch: $(TS_SRC)
	$(TSC) --watch

test:	$(TEST_EXECUTABLE)
	$(TEST_EXECUTABLE)
	$(JEST)

test_c: $(TEST_EXECUTABLE)
	$(TEST_EXECUTABLE)

test_ts:
	$(JEST)

lint: $(TS_SRC)
	$(TSLINT) $(TS_SRC)

clean:
	rm -rf $(DIST)/* $(EXECUTABLE) $(C_OBJ)

.PHONY: build build_ts watch test test_c test_ts lint clean
