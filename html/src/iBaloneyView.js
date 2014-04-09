$DEBUG = true;
function iBaloneyView(numPlayers) {
    var tmpNames = ["Mephibosheth", "David", "Joab", "Saul", "Jonathan",
		    "Nathan", "Abishai", "Asahel", "Ziba", "Abner" ];
    if (numPlayers > 10) {
	if ($DEBUG)
	    console.log("Must have fewer than 5 players.\n"
			+ numPlayers + " requested.\n"
			+ "Reducing the number to 5.");
	numPlayers = 5;
    }

    this._game = new Game();

    for (var i = 0; i < numPlayers; i++) {
	player = new Player(i+1, tmpNames[i], ((i == 0)
					       ? Player.TYPES.HUMAN
					       : Player.TYPES.ROBOT));
	this._game.addPlayer(player);
	player.tell("Welcome to iBaloney!  Choose your Discard.");
    }
}
iBaloneyView.prototype.game  = function() { return this._game; }
iBaloneyView.prototype.setup = function() {
    this._game.start();
    this.refreshAll();
    $(document).ready(this.setClickHand.bind(this));
    $(document).ready(this.setClickDiscard.bind(this));
    $(document).ready(this.setClickMaybeDiscards.bind(this));
}
iBaloneyView.prototype.refreshAll = function(){
    this.refreshHand();
    this.refreshMaybeDiscards();
    this.refreshDiscard();
    this.refreshHistory();
    this.refreshInfo();
}
iBaloneyView.prototype.makeArray = function(thing){
    if (typeof thing != "object")
	return [ thing ];
    return lines = thing;
}

iBaloneyView.prototype.updateGroup = function(selector, type, text, data) {
    var lines = this.makeArray(text);

    var section = $(selector);
    section.empty();

    for (var i = 0; i < lines.length; i++) {
	var newElement = $("<"+type+">");
	newElement.html(lines[i]);
	if (typeof data != "undefined") {
	    Object.keys(data[i]).forEach(function (key) {
 		newElement.attr("data-" + key, data[i][key]);
	    });
	}
	section.prepend(newElement);
    }
}
iBaloneyView.prototype.updateItem = function(selector, type, text) {
    var section = $(selector + " " + type).text(text);
}

iBaloneyView.fileNameFromCard = function (card) {
    return ("images/cards/" + card.suit() + card.rank() + ".png").toLowerCase();
}

iBaloneyView.prototype.refreshHand = function() {
    var imgList = [];
    var dataList = [];

    for (var i = 0; i < this._game.currentPlayer().hand().numberOfCards(); i++) {
	var card = this._game.currentPlayer().hand().cards(i);
	imgList.push('<img src="' + iBaloneyView.fileNameFromCard(card) + '">');
	dataList.push({ "index": i });
    }
    this.updateGroup(".hand", "li", imgList, dataList);
}

iBaloneyView.prototype.refreshMaybeDiscards = function() {
    var imgList = [];
    var dataList = [];
    var maybes = this._game.currentPlayer().maybeDiscard();

    for (var i = 0; i < maybes.numberOfCards(); i++) {
	var card = maybes.cards(i);
	imgList.push('<img src="' + iBaloneyView.fileNameFromCard(card) + '">');
	dataList.push({"index": i});
    }
    this.updateGroup(".maybe-discards", "li", imgList, dataList);

}

iBaloneyView.prototype.refreshDiscard = function() {
    this.updateGroup(".action", "li", '<img src="images/cards/_back.png">');
}

iBaloneyView.prototype.setClickDiscard = function(){
    var player = this._game.currentPlayer();

    $(".action").on("click", "li", function(event) {
	if(player.maybeDiscard().numberOfCards() == 0) {
	    console.log("%s is calling tell", this._game.currentPlayer().name());
	    player.tell("You must select cards from your hand before clicking Discard!");
	    this.refreshHistory();
	    return;
	    }
	this._game.discardPile().receiveCards(player.maybeDiscard().giveAllCards());
	this.refreshHistory();
	this.refreshMaybeDiscards();
	this.refreshInfo();

	this.robotTurns();
    }.bind(this));
}


iBaloneyView.prototype.setClickMaybeDiscards = function() {
    var cardsInDisplay = $(".maybe-discards");

    cardsInDisplay.on("click", "li", function(event) {
	var maybes = this._game.currentPlayer().maybeDiscard();
	var my = this._game.currentPlayer().hand();

	my.receive(maybes.giveAllCards());

	this.refreshHand(); this.refreshMaybeDiscards();
    }.bind(this));
  }

iBaloneyView.prototype.setClickHand = function() {
    var cardsInDisplay = $(".hand");

    cardsInDisplay.on("click", "li", function(event) {
	if (this._game.currentPlayer().maybeDiscard().numberOfCards() == 4) {
	    alert("You cannot discard more than 4 cards!");
	    return;
	}

	var target = $(event.currentTarget);
	var index = target.attr("data-index")
	var my = this._game.currentPlayer().hand();
	var maybes = this._game.currentPlayer().maybeDiscard();

	maybes.receiveCards([my.giveMatchingRank(my.cards(index).rank())]);
	this.refreshHand(); this.refreshMaybeDiscards();
    }.bind(this));
}

iBaloneyView.prototype.refreshHistory = function() {
    var lines = [];
    var messages = this._game.currentPlayer().messages(false);

// explore scroll overflow-y property on this list and then we can always show all the text.

    for (var i = 0; i < Math.min(20, messages.length); i++) {
	lines.unshift((i + 1) + ") " + messages[i]);
    }
    this.updateGroup(".history", "p", lines);
}
iBaloneyView.prototype.refreshInfo = function() {
    this.updateItem(".action-area", "h2", "Discarding "+ this._game.currentDiscardRank() + "s");
    this.updateGroup(".turn", "li",
		"It is " + this._game.currentPlayer().name() + "'s turn.");
    this.updateGroup(".discard", "li",
		[ "Discard Pile has " + this._game.discardPile().numberOfCards() + " cards",
		  "Your hand has " + this._game.currentPlayer().hand().numberOfCards() + " cards" ]);
    this.refreshPlayerStatus();
};
iBaloneyView.prototype.refreshPlayerStatus = function() {
    var playerStatus = [];
    for (var i = 0; i < this._game.numberOfPlayers(); i++) {
	player = this._game.players(i);
	playerStatus.unshift(player.number() + ") " + player.name() + " has "
			  + player.hand().numberOfCards() + " cards"
			  + ((player == this._game.currentPlayer()) ? " [You]" : ""));
    }
    this.updateGroup(".status", "li", playerStatus);
}

// enter as human, run the robots, exit as human or end with win
iBaloneyView.prototype.robotTurns = function(){
    this.checkForWinner();
    this._game.advanceToNextPlayer();
    while (! this._game.currentPlayer().isHuman()) {
	var player = this._game.currentPlayer();
	var hand = player.hand();
	var currentRank = this._game.currentDiscardRank();
	var matching = hand.countMatchingRank(currentRank);
//	console.log("robotTurns: rank is %s, %s has %s: %s", currentRank, player.name(), matching, hand.toString());
	if (matching > 0) {
	    var dp = this._game.discardPile();
	    var cards = player.hand().giveAllMatchingRank(currentRank);
	    dp.receiveCards(cards);
	    this.tellHumans(player, " claims to have discarded " + matching + " " + this._game.currentDiscardRank() +"s.");
	}
	else {
	    fakeCount = Math.round(Math.random() * Math.min(4, hand.numberOfCards()) + 1);
	    var discards = [];
	    for (var i = 0; i < fakeCount; i++) {
		discards.push(hand.giveCard());
	    }
	    this._game.discardPile().receiveCards(discards);
	    this.tellHumans(player, " claims to have discarded " + fakeCount + " " + this._game.currentDiscardRank() +"s.");
	}
    this.checkForWinner();
    this._game.advanceToNextPlayer();
    }

    this.refreshAll();

}

iBaloneyView.prototype.tellHumans = function (player, msg) {
    for (var i = 0; i < this._game.numberOfPlayers(); i++) {
	if (this._game.players(i).isHuman()) {
	    this._game.players(i).tell(player.name() + msg);
	    }
    }
}


iBaloneyView.prototype.checkForWinner = function(){
    if (this._game.hasWinner()) {
	var winner = this._game.currentPlayer();

	for (var i = 0; this._game.currentPlayer().isHuman(); i++) {
	    this._game.advanceToNextPlayer();
	}
	if (winner.isHuman())
	    this._game.currentPlayer().tell("Congratulations!");
	else
	    this._game.currentPlayer().tell("Better luck next time.");

	if (winner.isHuman())
	    var winnerName = "You";
	else
	    var winnerName = winner.name();
	this._game.currentPlayer().tell(winnerName + " won the game.");
	this.refreshAll();
	throw { name: 'FatalError', message: 'Game Over.' };
    }
}
