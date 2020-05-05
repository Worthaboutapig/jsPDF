/**
     * A matrix object for 2D homogenous transformations: <br>
     * | a b 0 | <br>
     * | c d 0 | <br>
     * | e f 1 | <br>
     * pdf multiplies matrices righthand: v' = v x m1 x m2 x ...
     *
     * @class
     * @name Matrix
     * @param {number} sx
     * @param {number} shy
     * @param {number} shx
     * @param {number} sy
     * @param {number} tx
     * @param {number} ty
     * @constructor
     */
export class Matrix {
  constructor(sx, shy, shx, sy, tx, ty) {
    if (!(this instanceof Matrix)) {
      return new Matrix(sx, shy, shx, sy, tx, ty);
    }
    var _matrix = [];
    /**
     * @name sx
     * @memberof Matrix#
     */
    Object.defineProperty(this, "sx", {
      get: function () {
        return _matrix[0];
      },
      set: function (value) {
        _matrix[0] = value;
      }
    });
    /**
     * @name shy
     * @memberof Matrix#
     */
    Object.defineProperty(this, "shy", {
      get: function () {
        return _matrix[1];
      },
      set: function (value) {
        _matrix[1] = value;
      }
    });
    /**
     * @name shx
     * @memberof Matrix#
     */
    Object.defineProperty(this, "shx", {
      get: function () {
        return _matrix[2];
      },
      set: function (value) {
        _matrix[2] = value;
      }
    });
    /**
     * @name sy
     * @memberof Matrix#
     */
    Object.defineProperty(this, "sy", {
      get: function () {
        return _matrix[3];
      },
      set: function (value) {
        _matrix[3] = value;
      }
    });
    /**
     * @name tx
     * @memberof Matrix#
     */
    Object.defineProperty(this, "tx", {
      get: function () {
        return _matrix[4];
      },
      set: function (value) {
        _matrix[4] = value;
      }
    });
    /**
     * @name ty
     * @memberof Matrix#
     */
    Object.defineProperty(this, "ty", {
      get: function () {
        return _matrix[5];
      },
      set: function (value) {
        _matrix[5] = value;
      }
    });
    Object.defineProperty(this, "a", {
      get: function () {
        return _matrix[0];
      },
      set: function (value) {
        _matrix[0] = value;
      }
    });
    Object.defineProperty(this, "b", {
      get: function () {
        return _matrix[1];
      },
      set: function (value) {
        _matrix[1] = value;
      }
    });
    Object.defineProperty(this, "c", {
      get: function () {
        return _matrix[2];
      },
      set: function (value) {
        _matrix[2] = value;
      }
    });
    Object.defineProperty(this, "d", {
      get: function () {
        return _matrix[3];
      },
      set: function (value) {
        _matrix[3] = value;
      }
    });
    Object.defineProperty(this, "e", {
      get: function () {
        return _matrix[4];
      },
      set: function (value) {
        _matrix[4] = value;
      }
    });
    Object.defineProperty(this, "f", {
      get: function () {
        return _matrix[5];
      },
      set: function (value) {
        _matrix[5] = value;
      }
    });
    /**
     * @name rotation
     * @memberof Matrix#
     */
    Object.defineProperty(this, "rotation", {
      get: function () {
        return Math.atan2(this.shx, this.sx);
      }
    });
    /**
     * @name scaleX
     * @memberof Matrix#
     */
    Object.defineProperty(this, "scaleX", {
      get: function () {
        return this.decompose().scale.sx;
      }
    });
    /**
     * @name scaleY
     * @memberof Matrix#
     */
    Object.defineProperty(this, "scaleY", {
      get: function () {
        return this.decompose().scale.sy;
      }
    });
    /**
     * @name isIdentity
     * @memberof Matrix#
     */
    Object.defineProperty(this, "isIdentity", {
      get: function () {
        if (this.sx !== 1) {
          return false;
        }
        if (this.shy !== 0) {
          return false;
        }
        if (this.shx !== 0) {
          return false;
        }
        if (this.sy !== 1) {
          return false;
        }
        if (this.tx !== 0) {
          return false;
        }
        if (this.ty !== 0) {
          return false;
        }
        return true;
      }
    });
    this.sx = !isNaN(sx) ? sx : 1;
    this.shy = !isNaN(shy) ? shy : 0;
    this.shx = !isNaN(shx) ? shx : 0;
    this.sy = !isNaN(sy) ? sy : 1;
    this.tx = !isNaN(tx) ? tx : 0;
    this.ty = !isNaN(ty) ? ty : 0;
    return this;
  }
  /**
       * Join the Matrix Values to a String
       *
       * @function join
       * @param {string} separator Specifies a string to separate each pair of adjacent elements of the array. The separator is converted to a string if necessary. If omitted, the array elements are separated with a comma (","). If separator is an empty string, all elements are joined without any characters in between them.
       * @returns {string} A string with all array elements joined.
       * @memberof Matrix#
       */
  join(separator) {
    return [this.sx, this.shy, this.shx, this.sy, this.tx, this.ty]
      .map(hpf)
      .join(separator);
  }
  /**
       * Multiply the matrix with given Matrix
       *
       * @function multiply
       * @param matrix
       * @returns {Matrix}
       * @memberof Matrix#
       */
  multiply(matrix) {
    var sx = matrix.sx * this.sx + matrix.shy * this.shx;
    var shy = matrix.sx * this.shy + matrix.shy * this.sy;
    var shx = matrix.shx * this.sx + matrix.sy * this.shx;
    var sy = matrix.shx * this.shy + matrix.sy * this.sy;
    var tx = matrix.tx * this.sx + matrix.ty * this.shx + this.tx;
    var ty = matrix.tx * this.shy + matrix.ty * this.sy + this.ty;
    return new Matrix(sx, shy, shx, sy, tx, ty);
  }
  /**
       * @function decompose
       * @memberof Matrix#
       */
  decompose() {
    var a = this.sx;
    var b = this.shy;
    var c = this.shx;
    var d = this.sy;
    var e = this.tx;
    var f = this.ty;
    var scaleX = Math.sqrt(a * a + b * b);
    a /= scaleX;
    b /= scaleX;
    var shear = a * c + b * d;
    c -= a * shear;
    d -= b * shear;
    var scaleY = Math.sqrt(c * c + d * d);
    c /= scaleY;
    d /= scaleY;
    shear /= scaleY;
    if (a * d < b * c) {
      a = -a;
      b = -b;
      shear = -shear;
      scaleX = -scaleX;
    }
    return {
      scale: new Matrix(scaleX, 0, 0, scaleY, 0, 0),
      translate: new Matrix(1, 0, 0, 1, e, f),
      rotate: new Matrix(a, b, -b, a, 0, 0),
      skew: new Matrix(1, 0, shear, 1, 0, 0)
    };
  }
  /**
       * @function toString
       * @memberof Matrix#
       */
  toString(parmPrecision) {
    return this.join(" ");
  }
  /**
       * @function inversed
       * @memberof Matrix#
       */
  inversed() {
    var a = this.sx, b = this.shy, c = this.shx, d = this.sy, e = this.tx, f = this.ty;
    var quot = 1 / (a * d - b * c);
    var aInv = d * quot;
    var bInv = -b * quot;
    var cInv = -c * quot;
    var dInv = a * quot;
    var eInv = -aInv * e - cInv * f;
    var fInv = -bInv * e - dInv * f;
    return new Matrix(aInv, bInv, cInv, dInv, eInv, fInv);
  }
  /**
       * @function applyToPoint
       * @memberof Matrix#
       */
  applyToPoint(pt) {
    var x = pt.x * this.sx + pt.y * this.shx + this.tx;
    var y = pt.x * this.shy + pt.y * this.sy + this.ty;
    return new Point(x, y);
  }
  /**
       * @function applyToRectangle
       * @memberof Matrix#
       */
  applyToRectangle(rect) {
    var pt1 = this.applyToPoint(rect);
    var pt2 = this.applyToPoint(new Point(rect.x + rect.w, rect.y + rect.h));
    return new Rectangle(pt1.x, pt1.y, pt2.x - pt1.x, pt2.y - pt1.y);
  }
  /**
       * Clone the Matrix
       *
       * @function clone
       * @memberof Matrix#
       * @name clone
       * @instance
       */
  clone() {
    var sx = this.sx;
    var shy = this.shy;
    var shx = this.shx;
    var sy = this.sy;
    var tx = this.tx;
    var ty = this.ty;
    return new Matrix(sx, shy, shx, sy, tx, ty);
  }
}
