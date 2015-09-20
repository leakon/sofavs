var odump = (function(){
  var max, INDENT = "                                   "; // As long as you need :)

  function valueToStr(value, depth) {
    switch (typeof value) {
      case "object":   return objectToStr(value, depth + 1);
      case "function": return "function";
      default:         return value;
    }
  }

  function objectToStr(object, depth) {
    if (depth > max)
      return false;

    var output = "";
    for (var key in object)
      output += "\n" + INDENT.substr(0,2*depth) + key + ": " + valueToStr(object[key], depth);

    return output;
  };

  return function odump(object, depth, _max) {
    max = _max || 2;
    return objectToStr(object, depth || 0);
  };
})();