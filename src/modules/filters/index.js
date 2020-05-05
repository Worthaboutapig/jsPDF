/* global jsPDF, Deflater */
/**
 * jsPDF filters PlugIn
 * Copyright (c) 2014 Aras Abbasi
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */

import { ASCII85, ASCIIHex } from "./encodings/index.js";

export function filters(jsPDFAPI) {
  /*
  var FlatePredictors = {
      None: 1,
      TIFF: 2,
      PNG_None: 10,
      PNG_Sub: 11,
      PNG_Up: 12,
      PNG_Average: 13,
      PNG_Paeth: 14,
      PNG_Optimum: 15
  };
  */

  jsPDFAPI.processDataByFilters = function (origData, filterChain) {
    var i = 0;
    var data = origData || "";
    var reverseChain = [];
    filterChain = filterChain || [];

    if (typeof filterChain === "string") {
      filterChain = [filterChain];
    }

    for (i = 0; i < filterChain.length; i += 1) {
      switch (filterChain[i]) {
        case "ASCII85Decode":
        case "/ASCII85Decode":
          data = ASCII85.decode(data);
          reverseChain.push("/ASCII85Encode");
          break;
        case "ASCII85Encode":
        case "/ASCII85Encode":
          data = ASCII85.encode(data);
          reverseChain.push("/ASCII85Decode");
          break;
        case "ASCIIHexDecode":
        case "/ASCIIHexDecode":
          data = ASCIIHex.decode(data);
          reverseChain.push("/ASCIIHexEncode");
          break;
        case "ASCIIHexEncode":
        case "/ASCIIHexEncode":
          data = ASCIIHex.encode(data);
          reverseChain.push("/ASCIIHexDecode");
          break;
        case "FlateEncode":
        case "/FlateEncode":
          data = Flate.encode(data);
          reverseChain.push("/FlateDecode");
          break;
        default:
          throw new Error('The filter: "' + filterChain[i] + '" is not implemented');
      }
    }

    return { data: data, reverseChain: reverseChain.reverse().join(" ") };
  };
}
