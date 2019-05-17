// var TYPED_OK =  (typeof Uint8Array !== 'undefined') &&
//                 (typeof Uint16Array !== 'undefined') &&
//                 (typeof Int32Array !== 'undefined');


// reduce buffer size, avoiding mem copy
const shrinkBuf = function (buf, size) {
  if (buf.length === size) { return buf; }
  if (buf.subarray) { return buf.subarray(0, size); }
  buf.length = size;
  return buf;
};


var fnTyped = {
  arraySet: function (dest, src, src_offs, len, dest_offs) {
    if (src.subarray && dest.subarray) {
      dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
      return;
    }
    // Fallback to ordinary array
    for (var i = 0; i < len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function (chunks) {
    var i, l, len, pos, chunk, result;

    // calculate data length
    len = 0;
    for (i = 0, l = chunks.length; i < l; i++) {
      len += chunks[i].length;
    }

    // join chunks
    result = new Uint8Array(len);
    pos = 0;
    for (i = 0, l = chunks.length; i < l; i++) {
      chunk = chunks[i];
      result.set(chunk, pos);
      pos += chunk.length;
    }

    return result;
  }
};

// var fnUntyped = {
//   arraySet: function (dest, src, src_offs, len, dest_offs) {
//     for (var i = 0; i < len; i++) {
//       dest[dest_offs + i] = src[src_offs + i];
//     }
//   },
//   // Join array of chunks to single array.
//   flattenChunks: function (chunks) {
//     return [].concat.apply([], chunks);
//   }
// };


// // Enable/Disable typed arrays use, for testing
// //
// const setTyped = function (on) {
//   if (on) {
//     const Buf8  = Uint8Array;
//     const Buf16 = Uint16Array;
//     const Buf32 = Int32Array;
//     const assign(exports, fnTyped);
//   } else {
//     const Buf8  = Array;
//     const Buf16 = Array;
//     const Buf32 = Array;
//     const assign(exports, fnUntyped);
//   }
// };

// const setTyped(TYPED_OK);

const { arraySet, flattenChunks } = fnTyped;
export { shrinkBuf, arraySet, flattenChunks };
