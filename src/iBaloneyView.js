function iBaloneyView(numPlayers) {
    var tmpNames = ["Mephibosheth", "David", "Joab", "Saul", "Jonathan",
		    "Nathan", "Abishai", "Asahel", "Ziba", "Abner" ];
    if (numPlayers > 10) {
	console.log("Must have fewer than 10 players.\n"
	      + numPlayers + " requested.\n"
	      + "Reducing the number to 10.");
	numPlayers = 10;
    }

    this._game = new Game();

    for (var i = 0; i < numPlayers; i++) {
	this._game.addPlayer(new Player(i+1, tmpNames[i], new Hand()));
    }
}
iBaloneyView.prototype.setup = function() { this._game.start(); }
iBaloneyView.prototype.game  = function() { return this._game; }
iBaloneyView.prototype.update = function(selector, type, text) {
    if (typeof text != "object")
	lines = [ text ];
    else
	lines = text;
    section = $(selector);
    section.empty();
    for (var i = 0; i < lines.length; i++) {
	section.append("<"+type+">" + lines[i] + "</"+type+">");
    }
}
iBaloneyView.prototype.displayHand = function() {
    var game = this._game;
    var cardList = []
    for (var i = 0; i < game.currentPlayer().hand().numberOfCards(); i++) {
	var card = game.currentPlayer().hand().cards()[i];
	cardList.push('<img src="images/cards/' + card.toFileBaseName() + '.png">');
    }
    this.update(".hand", "li", cardList);
}
iBaloneyView.prototype.displayHistory = function() {
    this.update(".history", "p", this._game.currentPlayer().messages());
}
iBaloneyView.prototype.displayInfo = function() {
    var game = this._game;
    this.update(".turn", "li", "It is " + game.currentPlayer().name() + "'s turn.");
    this.update(".discard", "li",
		[ "Discard has " + game.numberOfDiscards() + " cards",
		  "Hand has " + game.currentPlayer().hand().cards().numberOfCards + " cards" ]);
};
iBaloneyView.prototype.displayPlayerStatus = function() {
    var playerStatus = [];
    for (var i = 0; i < this._game.players().length; i++) {
	player = this._game.players()[i];
	playerStatus.push(player.number() + ") " + player.name() + " has "
			  + player.hand().numberOfCards() + " cards");
    }
    this.update(".status", "li", playerStatus);
}
