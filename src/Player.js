function Card(rank, suit) {
 this._rank = rank
 this._suit = suit
}
Card.prototype.value = function(song) {
  return 0
};

Card.prototype.toString = function() {
    return this._rank + "-" + this._suit
}
