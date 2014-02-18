function Player(number, name) {
    this._number = number;
    this._name = name;
    this._hand = new Hand();
    this._maybeDiscard = new Hand();
    this._messages = [];
}
Player.prototype.number = function() { return this._number; }
Player.prototype.name = function() { return this._name; }
Player.prototype.hand = function() { return this._hand; }
Player.prototype.maybeDiscard = function() { return this._maybeDiscard; }
Player.prototype.messages = function(consume) {
    var messages = this._messages;
    if (consume)
	this._messages = [];
    return messages;
}
Player.prototype.tell = function(message){
    this._messages.unshift(message);
}

Player.prototype.toString = function() {
    return "Player " + this._number + ") " + this._name + ": " + this._hand.toString();
}
