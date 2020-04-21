/**
 * jsPDF's Internal PubSub Implementation.
 * Backward compatible rewritten on 2014 by
 * Diego Casorran, https://github.com/diegocr
 *
 * @class
 * @name PubSub
 * @ignore
 */
/**
 * jsPDF's Internal PubSub Implementation.
 * Backward compatible rewritten on 2014 by
 * Diego Casorran, https://github.com/diegocr
 *
 * @class
 * @name PubSub
 * @ignore
 */
export class PubSub {
  constructor(context) {
    if (typeof context !== "object") {
      throw new Error("Invalid Context passed to initialize PubSub (jsPDF-module)");
    }
    var topics = {};
    this.subscribe = function (topic, callback, once) {
      once = once || false;
      if (typeof topic !== "string" ||
        typeof callback !== "function" ||
        typeof once !== "boolean") {
        throw new Error("Invalid arguments passed to PubSub.subscribe (jsPDF-module)");
      }
      if (!topics.hasOwnProperty(topic)) {
        topics[topic] = {};
      }
      var token = Math.random().toString(35);
      topics[topic][token] = [callback, !!once];
      return token;
    };

    this.unsubscribe = function (token) {
      for (var topic in topics) {
        if (topics[topic][token]) {
          delete topics[topic][token];
          if (Object.keys(topics[topic]).length === 0) {
            delete topics[topic];
          }
          return true;
        }
      }
      return false;
    };

    this.publish = function (topic) {
      if (topics.hasOwnProperty(topic)) {
        var args = Array.prototype.slice.call(arguments, 1), tokens = [];
        for (var token in topics[topic]) {
          var sub = topics[topic][token];
          try {
            sub[0].apply(context, args);
          }
          catch (ex) {
            if (global.console) {
              console.error("jsPDF PubSub Error", ex.message, ex);
            }
          }
          if (sub[1])
            tokens.push(token);
        }
        if (tokens.length)
          tokens.forEach(this.unsubscribe);
      }
    };

    this.getTopics = function () {
      return topics;
    };
  }
}

