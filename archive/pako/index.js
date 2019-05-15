// Top level file is just a mixin of submodules & constants

import { assign } from "./lib/utils/common.js";

import deflate from "./lib/deflate.js";
import inflate from "./lib/inflate.js";
import constants from "./lib/zlib/constants.js";

let pako = {};

assign(pako, deflate, inflate, constants);

export default pako;
