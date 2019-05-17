// Top level file is just a mixin of submodules & constants

import * as deflate from "./lib/deflate.js";
import * as inflate from "./lib/inflate.js";
import * as constants from "./lib/zlib/constants.ts";

let pako = {};

Object.assign(pako, deflate, inflate, constants);

export default pako;
