Card.RANKS = "2 3 4 5 6 7 8 9 10 J Q K A".split(" ");
Card.SUITS = "C D H S".split(" ");

function Card(cardString) {
 this._rank = cardString.split("-")[0];
 this._suit = cardString.split("-")[1];
// this._rank = rank
// this._suit = suit
}

Card.prototype.rank = function() {return this._rank}
Card.prototype.suit = function() {return this._suit}
Card.prototype.valueOf = function() { return Card.RANKS.indexOf(this._rank); }
Card.prototype.toString = function() { return this._rank + "-" + this._suit; }
