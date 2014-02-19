$DEBUG = true;
$TIMESTAMP = "";
$THING = "";
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
	this._game.addPlayer(new Player(i+1, tmpNames[i], new Hand()));
    }
}
iBaloneyView.prototype.game  = function() { return this._game; }
iBaloneyView.prototype.setup = function() {
    this._game.start();
    this.refreshAll();
    console.log("iBaloneyView.setup calling ready and setting click handlers.");
    // $(document).ready(this.setClickHand.bind(this));
    // $(document).ready(this.setClickMaybeDiscards.bind(this));
}
iBaloneyView.prototype.refreshAll = function(){
    this.refreshHand();
    this.refreshMaybeDiscards();
    this.refreshDiscard();
    this.refreshHistory();
    this.refreshInfo();
    this.refreshPlayerStatus();
}
iBaloneyView.prototype.makeArray = function(thing){
    if (typeof thing != "object")
	return [ thing ];
    return lines = thing;
}

iBaloneyView.prototype.update = function(selector, type, text, data) {
    lines = this.makeArray(text);

    section = $(selector);
    section.empty();

    for (var i = 0; i < lines.length; i++) {
	newElement = $("<"+type+">");
	newElement.html(lines[i]);
	if (typeof data != "undefined") {
	    Object.keys(data[i]).forEach(function (key) {
		if (false && $DEBUG) console.log("(%s) add attr %s: %s", selector, key, data[i][key]);
 		newElement.attr("data-" + key, data[i][key]);
	    });
	}
	section.append(newElement);
    }
}

iBaloneyView.fileNameFromCard = function (card) {
    return "images/cards/" + card.suit() + card.rank() + ".png"
}

iBaloneyView.prototype.refreshHand = function() {
    var imgList = [];
    var dataList = [];

    for (var i = 0; i < this._game.currentPlayer().hand().numberOfCards(); i++) {
	var card = this._game.currentPlayer().hand().cards(i);
	imgList.push('<img src="' + iBaloneyView.fileNameFromCard(card) + '">');
	dataList.push({ "index": i });
    }
    this.update(".hand", "li", imgList, dataList);

    $(document).ready(this.setClickHand.bind(this));
}

iBaloneyView.prototype.refreshMaybeDiscards = function(name) {
    if (typeof name !== "undefined") {
    	console.log("Updating title with name: ", name);
	$(".maybe-discards-area h2").text = name;
    } else {
    	console.log("Restoring title");
	$(".maybe-discards-area h2").text = "Discard Pile (click)";
    }

    var imgList = [];
    var dataList = [];
    var maybes = this._game.currentPlayer().maybeDiscard();

    console.log("discard # of cards:", maybes.numberOfCards());

    for (var i = 0; i < maybes.numberOfCards(); i++) {
	console.log("in the loop on ", i);
	var card = maybes.cards(i);
	imgList.push('<img src="' + iBaloneyView.fileNameFromCard(card) + '">');
	dataList.push({"index": i});
    }
    this.update(".maybe-discards", "li", imgList, dataList);

    $(document).ready(this.setClickMaybeDiscards.bind(this));
//    $(document).ready(this.setDblClickMaybeDiscards.bind(this));
}

iBaloneyView.prototype.refreshDiscard = function() {
    this.update(".action", "li", '<img src="images/cards/_back.png">');
}

// iBaloneyView.prototype.setClickMaybeDiscards = function() {
//     var cardsInDisplay = $(".maybe-discards li");

//     cardsInDisplay.on("click", function(event) {
// 	target = $(event.currentTarget);
// 	var index = target.attr("data-index")
// 	maybes = this._game.currentPlayer().maybeDiscard();
// 	console.log("selecting card[%s] (%s) to use as discard name.  target is:", index, maybes.cards(index).toString(), target);

// 	if (target.hasClass("selected"))
// 	    target.removeClass("selected"), console.log("unselected");
// 	else
// 	    target.addClass("selected"), console.log("selected");;
	
// 	this.refreshHand(); this.refreshMaybeDiscards(maybes.cards(index).toString());
//     }.bind(this));
//   }
iBaloneyView.prototype.setClickMaybeDiscards = function() {
    var cardsInDisplay = $(".maybe-discards li");

    cardsInDisplay.on("click", function(event) {
	if ($TIMESTAMP == event.timeStamp) {
	    // Why is the handler invoked twice for each click?
	    console.log("EVENT ECHO SEEN. Stopping application.");
	    clickEchoSeenStoppingApp();
	}
	$TIMESTAMP = event.timeStamp;

	target = $(event.currentTarget);
	maybes = this._game.currentPlayer().maybeDiscard();
	my = this._game.currentPlayer().hand();

	console.log("moving these maybes back to hand: ", maybes.toString());

	for (var i = 0; maybes.numberOfCards(); i++) {
	    console.log("i = ", i);
	    card = maybes.giveCard().unSelect();
	    console.log("moving: ", card.toString());
	    my.receive(card);
	}

	console.log("hand:", my.toString());
	console.log("discard:", maybes.toString());
	this.refreshHand(); this.refreshMaybeDiscards();
    }.bind(this));
  }

iBaloneyView.prototype.setClickHand = function() {
    var cardsInDisplay = $(".hand li");
    if ($DEBUG) console.log("setClickHand: 'this' = ", this);

    cardsInDisplay.on("click", function(event) {
	if ($TIMESTAMP == event.timeStamp) {
	    // Why is the handler invoked twice for each click?
	    console.log("EVENT ECHO SEEN. Stopping application.");
	    clickEchoSeenStoppingApp();
	}
	$TIMESTAMP = event.timeStamp;

	if (this._game.currentPlayer().maybeDiscard().numberOfCards() == 4) {
	    alert("You cannot discard more than 4 cards!");
	    return;
	}

	target = $(event.currentTarget);
	var index = target.attr("data-index")
	my = this._game.currentPlayer().hand();
	console.log("Summary: card(%s) clicked: %s of %s", index, my.cards(index).rank(), my.cards(index).suit());
	maybes = this._game.currentPlayer().maybeDiscard();
	my.cards(index).select();

//console.log("target = ", target);
//	target.children("img").addClass("selected");
	//	    var someCards = my.giveSelected();
	// 	    console.log("somecards = ", someCards);
	//	    maybes.receive(someCards);
	maybes.receive(my.giveSelected());
	console.log("Maybe Discards: ", maybes.toString());
	$DEBUG = ! $DEBUG;
	this.refreshHand(); this.refreshMaybeDiscards();
	$DEBUG = ! $DEBUG;
    }.bind(this));


    if ($DEBUG) console.log("...and we are now leaving setClickHand");
}

iBaloneyView.prototype.refreshHistory = function() {
    this.update(".history", "p", this._game.currentPlayer().messages());
}
iBaloneyView.prototype.refreshInfo = function() {
    var game = this._game;
    this.update(".turn", "li", "It is " + game.currentPlayer().name() + "'s turn.");
    this.update(".discard", "li",
		[ "Discard has " + game.discard().numberOfCards() + " cards",
		  "Hand has " + game.currentPlayer().hand().numberOfCards() + " cards" ]);
};
iBaloneyView.prototype.refreshPlayerStatus = function() {
    var playerStatus = [];
    for (var i = 0; i < this._game.numberOfPlayers(); i++) {
	player = this._game.players(i);
	playerStatus.push(player.number() + ") " + player.name() + " has "
			  + player.hand().numberOfCards() + " cards"
			  + ((player == this._game.currentPlayer()) ? " [You]" : ""));
    }
    this.update(".status", "li", playerStatus);
}
