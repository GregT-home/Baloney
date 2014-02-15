$DEBUG = false
function iBaloneyView(numPlayers) {
    var tmpNames = ["Mephibosheth", "David", "Joab", "Saul", "Jonathan",
		    "Nathan", "Abishai", "Asahel", "Ziba", "Abner" ];
    if (numPlayers > 10) {
	if ($DEBUG)
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

    if ($DEBUG) {
	console.log("update is replacing '%s(%s)' body with:", selector, type);
	for (i in lines) console.log(lines[i]);
    }

    for (var i = 0; i < lines.length; i++) {
	section.append("<"+type+">" + lines[i] + "</"+type+">");
    }
}
iBaloneyView.prototype.displayHand = function() {
    var game = this._game;
    var cardList = []

    for (var i = 0; i < game.currentPlayer().hand().numberOfCards(); i++) {
	var card = game.currentPlayer().hand().cards()[i];
	var attr = 'data-rank="' + card.rank() + '" data-suit= "' + card.suit() + '"';
	cardCode = '<img ' + attr + ' src="images/cards/' + card.toFileBaseName() + '.png">';
	cardList.push(cardCode);
    }
    this.update(".hand li", "li", cardList);
}

iBaloneyView.prototype.listClickedCards = function(eventObject) {
    console.log("click callback called with %s, %s", eventObject);
}

iBaloneyView.prototype.setClickHand = function() {
    // unless .bind() is used to pass in a different handler, then the 'this'
    // context in a handler is the selector/document, not iBaloneyView.
    if ($DEBUG) console.log("We have entered setClickHand.  this is: ", this);
    var cardsInDisplay = $(".hand li");
    if ($DEBUG) console.log(cardsInDisplay);
    //    cardsInDisplay.on('click', this.listClickedCards);
    if ($DEBUG) console.log("We register a click handler...");
    cardsInDisplay.on("click","", { text: "some data to see", playerNumber: 4011}, function(eventObject) {
	if ($DEBUG) {
	console.log("on-click callback called with eventObject = %s", eventObject);
	console.log(eventObject);
	console.log("bind makes 'this' the the iBaloneyView context passed in " +
		    "from the ready() call: ", this);
	console.log("data = %s, %i, this:", eventObject.data.text, eventObject.data.playerNumber, this);
	}
    }.bind(this));
    if ($DEBUG) console.log("...and we are now leaving setClickHand");
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
