/**
 * Zip test
 */
import { test, runIfMain } from "../testing/mod.ts";
import { assertEquals } from "../testing/asserts.ts";

import pako from "./pako/index.js";

test(async function inflateAndDeflate(): Promise<void> {
  const inputString = "hello tar world!";
  const input = new TextEncoder().encode(inputString);
  const inflated = pako.inflate(input);
  const deflated = pako.deflate(inflated);
  const outputString = new TextDecoder("utf-8").decode(deflated);
  assertEquals(inputString, outputString);
});

runIfMain(import.meta);
