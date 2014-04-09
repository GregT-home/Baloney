function Player(number, name, type) {
    this._number = number;
    this._name = name;
    this._hand = new Hand();
    this._maybeDiscard = new Pile();
    this._messages = [];
    if (typeof type === "undefined")
     	this._type = Player.TYPES.HUMAN;
     else
     	this._type = type;
}
Player.TYPES = {HUMAN: 1, ROBOT: 2};
//Player.prototype.type = function(typeName) { return this._type; }
Player.prototype.isHuman = function(typeName) { return this._type == Player.TYPES.HUMAN; }
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
    if (this.isHuman())
	type = "Player";
    else
	type = "Robot";

    return type + " " + this._number + ") " + this._name + ": " + this._hand.toString();
}
