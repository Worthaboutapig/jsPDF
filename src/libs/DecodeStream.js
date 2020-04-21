/*
   * Extracted from pdf.js
   * https://github.com/andreasgal/pdf.js
   *
   * Copyright (c) 2011 Mozilla Foundation
   *
   * Contributors: Andreas Gal <gal@mozilla.com>
   *               Chris G Jones <cjones@mozilla.com>
   *               Shaon Barman <shaon.barman@gmail.com>
   *               Vivien Nicolas <21@vingtetun.org>
   *               Justin D'Arcangelo <justindarc@gmail.com>
   *               Yury Delendik
   *
   *
   */
export class DecodeStream {
  constructor() {
    this.pos = 0;
    this.bufferLength = 0;
    this.eof = false;
    this.buffer = null;
  }

  ensureBuffer(requested) {
    var buffer = this.buffer;
    var current = buffer ? buffer.byteLength : 0;
    if (requested < current) { return buffer; }
    var size = 512;

    while (size < requested) {
      size <<= 1;
    }

    var buffer2 = new Uint8Array(size);

    for (var i = 0; i < current; ++i) {
      buffer2[i] = buffer[i];
    }

    return this.buffer = buffer2;
  }

  getByte() {
    var pos = this.pos;

    while (this.bufferLength <= pos) {
      if (this.eof) { return null; }
      this.readBlock();
    }

    return this.buffer[this.pos++];
  }

  getBytes(length) {
    var pos = this.pos;

    if (length) {
      this.ensureBuffer(pos + length);
      var end = pos + length;

      while (!this.eof && this.bufferLength < end) {
        this.readBlock();
      }

      var bufEnd = this.bufferLength;
      if (end > bufEnd) { end = bufEnd; }
    } else {
      while (!this.eof) {
        this.readBlock();
      }

      var end = this.bufferLength;
    }

    this.pos = end;
    return this.buffer.subarray(pos, end);
  }

  lookChar() {
    var pos = this.pos;

    while (this.bufferLength <= pos) {
      if (this.eof) { return null; }
      this.readBlock();
    }

    return String.fromCharCode(this.buffer[this.pos]);
  }

  getChar() {
    var pos = this.pos;

    while (this.bufferLength <= pos) {
      if (this.eof) { return null; }
      this.readBlock();
    }

    return String.fromCharCode(this.buffer[this.pos++]);
  }

  makeSubStream(start, length, dict) {
    var end = start + length;

    while (this.bufferLength <= end && !this.eof) {
      this.readBlock();
    }

    return new Stream(this.buffer, start, length, dict);
  }

  skip(n) {
    if (!n) { n = 1; }
    this.pos += n;
  }

  reset() {
    this.pos = 0;
  }
};
