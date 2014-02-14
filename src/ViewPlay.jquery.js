// consider defining a shuffle method for the array class, not just the deck

function iBaloneyView(numPlayers) {
    this.deck = new Deck();
    this.deck.shuffle();
    this.players = [];
    tmpNames = ["Mephibosheth", "David", "Joab", "Saul"];

    for (var i = 0; i < numPlayers; i++) {
	console.log("adding player #", i);
	this.players[i] = new Player(i, tmpNames[i], new Hand());
    }
    var currentPlayer = this.players[0];
    this.hand = currentPlayer.hand();
    console.log("length players is ", this.players.length);

}

iBaloneyView.prototype.setup = function() {
console.log("setting up for ", this.players.length);
    for (var p = 0; p < this.players.length; p++) {
	player = this.players[p];
	console.log(player.name() + " is getting ", 52/this.players.length, " cards");
	for (var cardIndex = 0; cardIndex < (52 / this.players.length); cardIndex++) {
	    player.hand().receiveCards([this.deck.giveCard()]);
	}
    }
}

iBaloneyView.prototype.displayHand = function() {
    // display some cards
    handArea = $(".hand");
    handArea.empty();
    console.log("hand =", this.hand);
    for (var i = 0; i < this.hand.cards().length; i++) {
	var card = this.hand.cards()[i];
	var imageElement = '<img src="images/cards/' + card.toFileBaseName() + '.png">';
	handArea.append("<li>" + imageElement + "</li>");
    }
}
iBaloneyView.prototype.displayHistory = function() {
    //    display some history
    historyArea = $(".history");
    historyArea.empty();
    historyArea.append("<p>History messages go here</p>");
}

iBaloneyView.prototype.displayInfo = function() {
    var turnArea = $(".turn");
    turnArea.empty();
    tmpPlayerName = "Mephibosheth's";
    turnArea.append("<li>It is " + tmpPlayerName + " turn.</li>");

    var pondArea = $(".pond");
    pondArea.empty();
    pondArea.append("Pond has " + this.deck.cards().length + " cards");
    pondArea.append("Hand has " + this.hand.cards().length + " cards");
};

iBaloneyView.prototype.displayPlayerStatus = function() {
    var statusArea = $(".status");
    statusArea.empty();
    for (var i = 0; i < this.players.length; i++) {
	player = this.players[i];
	console.log("player[",i,"] is ", player.name());
	statusArea.append("<li>" + player.number() + ") " + player.name()
			  + " has " + player.hand().length() + " cards");
    }
}

window.onload = function() {
    var view = new iBaloneyView(4);
    view.setup();
    view.displayHand();
    view.displayHistory();
    view.displayInfo();
    view.displayPlayerStatus();
};
