function Game() {
	this._players = [];
	this._started = false;
	this._currentPlayerIndex;
	this._discard;
 }
Game.prototype.discard = function()    { return this._discard; }
Game.prototype.started = function() { return this._started; }
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

    this._started = true;
}
// Move to Object+JSON.js
Object.prototype.toJSON = function() {
    this.className = this.constructor.name;
    return this;
}

Game.fromJSON = function(string){
    var obj = JSON.parse(string);
    obj.__proto__ = window[obj.className].prototype;
    Game.toObject(obj);
    return obj;
}

Game.toObject = function(genericObject){
    // var prefix = "toObject("
    // 	+ Object.prototype.toString.call(genericObject)
    // 	+ "/name "+genericObject.className+"): ";

//investigate JSON.parse revivier function

    for (thing in genericObject) {
	obj = genericObject[thing];
	if (Object.prototype.toString.call(obj) === '[object Array]') {
	    Game.toObject(obj);
	}
	else {
	    if (typeof obj === "Object" && typeof obj.className !== "undefined") {
		obj.__proto__ = genericObject[obj.className].prototype;
	    }
	}
    }
    return;
}
