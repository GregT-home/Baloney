$DEBUG = true;
$TIMESTAMP = "";
$THING = "";
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
iBaloneyView.prototype.game  = function() { return this._game; }
iBaloneyView.prototype.setup = function() {
    this._game.start();
    this.displayAll();
    console.log("iBaloneyView.setup calling ready and setting click handlers.");
    // $(document).ready(this.setClickHand.bind(this));
    // $(document).ready(this.setClickMaybeDiscards.bind(this));
}
iBaloneyView.prototype.displayAll = function(){
    this.displayHand();
    this.displayMaybeDiscards();
    this.displayDiscard();
    this.displayHistory();
    this.displayInfo();
    this.displayPlayerStatus();
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

    // if ($DEBUG) {
    // 	console.log("update '%s(%s)' body with:", selector, type);
    // 	for (i in lines) console.log("    %s", lines[i]);
    // }

    for (var i = 0; i < lines.length; i++) {
	newElement = $("<"+type+">");
	newElement.html(lines[i]);
	if (typeof data != "undefined") {
	    Object.keys(data[i]).forEach(function (key) {
		if ($DEBUG) console.log("(%s) add attr %s: %s", selector, key, data[i][key]);
 		newElement.attr("data-" + key, data[i][key]);
	    });
	}
	section.append(newElement);
    }
}
iBaloneyView.prototype.displayHand = function() {
    var game = this._game;
    var imgList = [];
    var dataList = [];

    for (var i = 0; i < game.currentPlayer().hand().numberOfCards(); i++) {
	var card = game.currentPlayer().hand().cards(i);
	var data = {"index": i};
	var imgElement = '<img src="' + iBaloneyView.fileNameFromCard(card) + '">';
	imgList.push(imgElement);
	dataList.push(data);
    }
    this.update(".hand", "li", imgList, dataList);

    $(document).ready(this.setClickHand.bind(this));
}

iBaloneyView.fileNameFromCard = function (card) {
    return "images/cards/" + card.suit() + card.rank() + ".png"
}

iBaloneyView.prototype.displayMaybeDiscards = function() {
    var game = this._game;
    var discards = game.currentPlayer().maybeDiscard();
    var imgList = [];
    var dataList = [];

console.log("discard # of cards:", discards.numberOfCards());
    for (var i = 0; i < discards.numberOfCards(); i++) {
	var card = discards.cards(i);
	var data = {"index": i};
	var imgElement = '<img src="' + iBaloneyView.fileNameFromCard(card) + '">';
	imgList.push(imgElement);
	dataList.push(data);
    }
    this.update(".maybe-discards li", "li", imgList, dataList);
    $(document).ready(this.setClickMaybeDiscards.bind(this));
}

iBaloneyView.prototype.displayDiscard = function() {
    this.update(".action li", "li", '<img src="images/cards/_back.png">');
}

iBaloneyView.prototype.setClickMaybeDiscards = function() {
    var cardsInDisplay = $(".maybe-discards li");

    cardsInDisplay.on("click", function(event) {
	if ($TIMESTAMP == event.timeStamp) {
	    // Why is the handler invoked twice for each click?
	    console.log("EVENT ECHO SEEN.  skipping out.");
	    return;
	}
	$TIMESTAMP = event.timeStamp;

	target = $(event.currentTarget);
	var index = target.attr("data-index")
	console.log("index is ", index, " target is ", target);
	maybes = this._game.currentPlayer().maybeDiscard();
	my = this._game.currentPlayer().hand();

console.log("moving maybes back to hand. index: ", index, " : ", maybes.toString());
//	target.children("img").removeClass("selected");
console.log("number of cards in maybes hand: ", maybes.numberOfCards());
	for (var i = 0; maybes.numberOfCards(); i++) {
	    console.log("i = ", i);
	    card = maybes.giveCard().unSelect();
	    console.log("moving: ", card.toString());
	    my.receive(card);
	}
	console.log("hand:", my.toString());
	console.log("discard:", maybes.toString());
	this.displayHand(); this.displayMaybeDiscards();
	$DEBUG = ! $DEBUG;
	$DEBUG = false;
    }.bind(this));
  }

iBaloneyView.prototype.setClickHand = function() {
    var cardsInDisplay = $(".hand li");
    if ($DEBUG) console.log("setClickHand: 'this' = ", this);

    cardsInDisplay.on("click", function(event) {
	if ($TIMESTAMP == event.timeStamp) {
	    // Why is the handler invoked twice for each click?
	    console.log("EVENT ECHO SEEN.  skipping out.");
	    return;
	}
	$TIMESTAMP = event.timeStamp;

	if (this._game.currentPlayer().maybeDiscard().numberOfCards() == 4) {
	    alert("You cannot discard more than 4 cards!");
	    return;
	}

	target = $(event.currentTarget);
	var index = target.attr("data-index")
	my = this._game.currentPlayer().hand();
	console.log("Summary: card(%s) is %s of %s", index, my.cards(index).rank(), my.cards(index).suit());
	maybes = this._game.currentPlayer().maybeDiscard();

	if ($DEBUG) console.log("Selecting: ", index, " : ", my.cards(index).toString());
	my.cards(index).select();

//console.log("target = ", target);
//	target.children("img").addClass("selected");
	//	    var someCards = my.giveSelected();
	// 	    console.log("somecards = ", someCards);
	//	    maybes.receive(someCards);
	maybes.receive(my.giveSelected());
	console.log("Maybe Discards: ", maybes.toString());
	$DEBUG = ! $DEBUG;
	this.displayHand(); this.displayMaybeDiscards();
	$DEBUG = ! $DEBUG;
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
		[ "Discard has " + game.discard().numberOfCards() + " cards",
		  "Hand has " + game.currentPlayer().hand().numberOfCards() + " cards" ]);
};
iBaloneyView.prototype.displayPlayerStatus = function() {
    var playerStatus = [];
    for (var i = 0; i < this._game.numberOfPlayers(); i++) {
	player = this._game.players(i);
	playerStatus.push(player.number() + ") " + player.name() + " has "
			  + player.hand().numberOfCards() + " cards"
			  + ((player == this._game.currentPlayer()) ? " [You]" : ""));
    }
    this.update(".status", "li", playerStatus);
}
