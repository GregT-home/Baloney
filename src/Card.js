Card.RANKS = "2 3 4 5 6 7 8 9 10 J Q K A".split(" ");
Card.SUITS = "C D H S".split(" ");

function Card(cardString) {
 this._rank = cardString.split("-")[0];
 this._suit = cardString.split("-")[1];
 this._isSelected = false;
}
Card.prototype.toJSON = function() {
    this.className = this.constructor.name;
    return this;
}
Card.fromJSON = function(string){
    var obj = JSON.parse(string);
    obj.__proto__ = window[obj.className].prototype;
    return obj;
}
Card.prototype.rank = function() {return this._rank; }
Card.prototype.suit = function() {return this._suit; }
Card.prototype.isSelected = function() { return this._isSelected; }
Card.prototype.valueOf = function() { return Card.RANKS.indexOf(this._rank); }
Card.prototype.select = function() { this._isSelected = true; return this;}
Card.prototype.unSelect = function() { this._isSelected = false; return this;}

Card.prototype.toString = function() { return this._rank + (this._isSelected ? "=" : "-") + this._suit; }
Card.prototype.toFileBaseName = function() { return this._suit + this._rank; }
