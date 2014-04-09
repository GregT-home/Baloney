function Game() {
    this._players = [];
    this._started = false;
    this._currentPlayerIndex;
    this._discardPile;
    this._currentDiscardRank;
}
Game.prototype.discardPile = function() { return this._discardPile; }
Game.prototype.started = function()     { return this._started; }
Game.prototype.hasWinner = function() {
    return (this._currentPlayer.hand().numberOfCards() == 0);
}
Game.prototype.currentDiscardRank = function() { return this._currentDiscardRank; }
Game.prototype.players = function(i) { return this._players[i]; }

Game.prototype.numberOfPlayers = function() {
    return this._players.length;
}
Game.prototype.currentPlayer = function()    {
    return this._players[this._currentPlayerIndex];
}
Game.prototype.addPlayer = function(player) {
    this._players.push(player);
}
Game.prototype.advanceToNextPlayer = function() {
    this._currentPlayerIndex++;
    this._currentPlayerIndex %= this._players.length;
    this._currentPlayer = this._players[this._currentPlayerIndex];

    var curIndex = Card.RANKS.indexOf(this._currentDiscardRank);
    curIndex++;
    curIndex = curIndex % (Card.RANKS.indexOf("A") + 1);
    this._currentDiscardRank = Card.RANKS[curIndex];
}

Game.prototype.start = function(){
    var deck = new Deck();
    this._currentPlayerIndex = 0;
    this._currentPlayer = this._players[0];
    this._discardPile = new Pile();
    this._currentDiscardRank = Card.RANKS[0];

    deck.shuffle();
    for (var p = 0, card = deck.giveCard(); (card = deck.giveCard()); p++) {
	var playerNumber = p % this._players.length;
	this._players[playerNumber].hand().receive(card);
    }
    this._started = true;
}
