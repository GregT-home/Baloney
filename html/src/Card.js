Card.RANKS = "2 3 4 5 6 7 8 9 10 J Q K A".split(" ");
Card.SUITS = "C D H S".split(" ");

function Card(cardString) {
    this._rank = cardString.split("-")[0].toUpperCase();
    this._suit = cardString.split("-")[1].toUpperCase();
    this._isSelected = false;
}
Card.prototype.rank = function() {return this._rank; }
Card.prototype.suit = function() {return this._suit; }
Card.prototype.isSelected = function() { return this._isSelected; }
Card.prototype.valueOf = function() { return Card.RANKS.indexOf(this._rank); }
Card.prototype.toString = function() {
    return (this._rank + (this._isSelected ? "=" : "-") + this._suit);
}

Card.prototype.select = function() { this._isSelected = true; return this;}
Card.prototype.unSelect = function() { this._isSelected = false; return this;}
