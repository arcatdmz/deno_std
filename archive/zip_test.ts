/**
 * Zip test
 */
import { test, runIfMain } from "../testing/mod.ts";
import { assertEquals } from "../testing/asserts.ts";

import pako from "./pako/index.js";

test(async function deflateAndInflate(): Promise<void> {
  const inputString = "hello zip world!";
  const input = new TextEncoder().encode(inputString);
  const deflated = pako.deflate(input);
  const inflated = pako.inflate(deflated);
  const outputString = new TextDecoder("utf-8").decode(inflated);
  assertEquals(inputString, outputString);
});

runIfMain(import.meta);
