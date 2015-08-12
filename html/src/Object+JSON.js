/*
 * Methods to convert objects out of JSON and reconstistute them
 * with their full prototypes.
 */

// Presence of a toJSON method causes JSON#stringify to use the result of that
// method for stringification.
Object.prototype.toJSON = function() {
  this.className = this.constructor.name;
  return this;
}

// defining a couple of class methods to facilitate conversion from string
// back into particular objects
Object.fromJSON = function(string){
    var obj = JSON.parse(string);
    obj.__proto__ = window[obj.className].prototype;
    Object.objectConverter(obj);
    return obj;
}

// The genericObject has no prototypes; using the className (i.e., constructor name),
// re-associate the class's prototype to the genericObject.
Object.objectConverter = function (genericObject) {
  for (thing in genericObject) {
    obj = genericObject[thing];
    if (obj.constructor.name === "Array") {
      Object.objectConverter(obj);
    }
    else {
      if (obj.constructor.name === "Object" && obj.className !== "undefined") {
        obj.__proto__ = window[obj.className].prototype;
        Object.objectConverter(obj);
      }
    }
   }
   return;
}
