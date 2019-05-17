/**
 * Zip test
 */
import { test, runIfMain } from "../testing/mod.ts";
import { assertEquals } from "../testing/asserts.ts";
import { bytesFindIndex } from "../bytes/bytes.ts";

import * as pako from "./pako/index.ts";

import { string2buf, buf2string } from "./pako/lib/utils/strings.ts";

test(async function deflateAndInflate(): Promise<void> {
  const inputString = "hello zip world!";
  const input = new TextEncoder().encode(inputString);
  const deflated = pako.deflate(input);
  const inflated = pako.inflate(deflated);
  const outputString = new TextDecoder("utf-8").decode(inflated);
  assertEquals(inputString, outputString);
});

test(async function stringAndBuffer(): Promise<void> {
  const inputString = "hello こんにちは";
  const nativeOutput = new TextEncoder().encode(inputString);
  const output = string2buf(inputString);
  const outputString = buf2string(output, output.length);
  const nativeOutputString = new TextDecoder("utf-8").decode(output);
  assertEquals(bytesFindIndex(nativeOutput, output), 0);
  assertEquals(inputString, outputString);
  assertEquals(outputString, nativeOutputString);
});

runIfMain(import.meta);
