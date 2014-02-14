function Game() {
	this._players = [];
	this._started = false;
	this._currentPlayerIndex;
	this._discards;
	this._candidateDiscard;
 }
Game.prototype.numberOfDiscards = function() { return this._discards.length; }
Game.prototype.players = function()          { return this._players; }
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
	this._discards = [];
	this._candidateDiscard = [];

    deck.shuffle();
    for (var p = 0, card = deck.giveCard(); (card = deck.giveCard()); p++) {
	var playerNumber = p % this._players.length;
	this._players[playerNumber].hand().receive(card);
    }
    this.started = true;
}
