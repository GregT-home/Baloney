function Player(number, name, hand) {
    this._number = number;
    this._name = name;
    this._hand = hand;
}
Player.prototype.number = function() { return this._number; }
Player.prototype.name = function() { return this._name; }
Player.prototype.hand = function() { return this._hand; }
