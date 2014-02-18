function Game() {
	this._players = [];
	this._started = false;
	this._currentPlayerIndex;
	this._discard;
 }
Game.prototype.discard = function()    { return this._discard; }
//Game.prototype.numberOfDiscards = function() { return this._discard.length; }
Game.prototype.players = function(i)          { return this._players[i]; }
Game.prototype.numberOfPlayers = function()  { return this._players.length; }
Game.prototype.currentPlayer = function()    { return this._players[this._currentPlayerIndex]; }

Game.prototype.addPlayer = function(player) {
    this._players.push(player);
    player.tell("Welcome to iBaloney");
}
Game.prototype.advanceToNextPlayer = function() {
	this._currentPlayerIndex++;
	this._currentPlayerIndex %= this._players.length;
	this._currentPlayer = this._players[this._currentPlayerIndex];
}
Game.prototype.start = function(){
    var deck = new Deck();
	this._currentPlayerIndex = 0;
	this._currentPlayer = this._players[0];
	this._discard = new Hand();

    deck.shuffle();
    for (var p = 0, card = deck.giveCard(); (card = deck.giveCard()); p++) {
	var playerNumber = p % this._players.length;
	this._players[playerNumber].hand().receive(card);
if (p == 6) this._currentPlayer._maybeDiscard.receive(deck.giveCard());
    }

    console.log("cand disc hand: ", this._currentPlayer._maybeDiscard.toString());

    this.started = true;
}
Game.prototype.toJSON = function() {
    this.className = this.constructor.name;
    console.log(".toJSON calling .toObject.  Typeof this is: ", typeof this, this);
    Game.toObject(this);
    return this;
}
Game.fromJSON = function(string){
    var obj = JSON.parse(string);
    obj.__proto__ = window[obj.className].prototype;

    return obj;
}
Game.toObject = function(genericObject){

    console.log("toObject(", typeof genericObject, ")", genericObject);
    for (thing in genericObject) {
	obj = genericObject[thing];
	console.log("typeof obj = ", typeof obj);
	if (typeof obj === "Array") {
	    console.log("calling toObject recursively");
	    Game.toObject(obj);
	}
	else {
	    if (typeof obj === "Object" && typeof obj.className !== "undefined") {
		console.log("setting prototype of %s", obj.className);
		obj.__proto__ = genericObject[obj.className].prototype;
	    }
	}
    }
    return;
}
