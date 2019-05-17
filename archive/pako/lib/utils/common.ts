export type TypedArray = Uint8Array | Uint16Array | Uint32Array;
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray

// reduce buffer size, avoiding mem copy
export function shrinkBuf<B extends TypedArray | Array<any>>(buf: B, size: number): B {
  if (buf.length === size) { return buf; }
  if (Array.isArray(buf)) {
    (buf as Array<any>).length = size;
    return buf;
  }
  return (buf as TypedArray).subarray(0, size) as B;
}

export function arraySet<T extends TypedArray>(dest: T, src: T, src_offs: number, len: number, dest_offs: number) {
  if (src.subarray && dest.subarray) {
    dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
    return;
  }
  // Fallback to ordinary array
  for (var i = 0; i < len; i++) {
    dest[dest_offs + i] = src[src_offs + i];
  }
}

// Join array of chunks to single array.
export function flattenChunks(chunks: Array<Uint8Array | Array<any>>): Uint8Array {
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
