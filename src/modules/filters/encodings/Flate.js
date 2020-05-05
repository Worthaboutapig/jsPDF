export const Flate = {
  encode(data) {
    var arr = [];
    var i = data.length;
    var adler32;
    var deflater;

    while (i--) {
      arr[i] = data.charCodeAt(i);
    }

    adler32 = jsPDFAPI.adler32cs.from(data);
    deflater = new Deflater(6);
    data = deflater.append(new Uint8Array(arr));
    data = appendBuffer(data, deflater.flush());
    arr = new Uint8Array(data.byteLength + 6);
    arr.set(new Uint8Array([120, 156]));
    arr.set(data, 2);
    arr.set(
      new Uint8Array([
        adler32 & 0xff,
        (adler32 >> 8) & 0xff,
        (adler32 >> 16) & 0xff,
        (adler32 >> 24) & 0xff
      ]),
      data.byteLength + 2
    );

    data = arr.reduce(function(data, byte) {
      return data + String.fromCharCode(byte);
    }, "");
    return data;
  }
};

const appendBuffer = function(buffer1, buffer2) {
  const combinedBuffer = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
  combinedBuffer.set(new Uint8Array(buffer1), 0);
  combinedBuffer.set(new Uint8Array(buffer2), buffer1.byteLength);

  return combinedBuffer;
};

