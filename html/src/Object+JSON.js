// Methods to convert objects out of JSON and reconstistute them
// with their full prototypes.
// Object.prototype.toJSON = function() {
//     this.className = this.constructor.name;
//     return this;
// }

// Object.prototype.fromJSON = function(string){
//     var obj = JSON.parse(string);
//     obj.__proto__ = window[obj.className].prototype;
//     Game.toObject(obj);
//     return obj;
// }

// Game.toObject = function(genericObject){
//     // var prefix = "toObject("
//     // 	+ Object.prototype.toString.call(genericObject)
//     // 	+ "/name "+genericObject.className+"): ";

// //investigate JSON.parse revivier function

//     for (thing in genericObject) {
// 	obj = genericObject[thing];
// 	if (Object.prototype.toString.call(obj) === '[object Array]') {
// 	    Game.toObject(obj);
// 	}
// 	else {
// 	    if (typeof obj === "Object" && typeof obj.className !== "undefined") {
// 		obj.__proto__ = genericObject[obj.className].prototype;
// 	    }
// 	}
//     }
//     return;
// }
