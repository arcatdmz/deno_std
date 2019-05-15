// Top level file is just a mixin of submodules & constants

import { assign } from "./lib/utils/common.js";

import * as deflate from "./lib/deflate.js";
import * as inflate from "./lib/inflate.js";
import * as constants from "./lib/zlib/constants.js";

let pako = {};

assign(pako, deflate, inflate, constants);

export default pako;
