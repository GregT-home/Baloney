// consider defining a shuffle method for the array class, not just the deck

function iBaloneyView(numPlayers) {
    this.deck = new Deck();
    this.deck.shuffle();
    this.hand = new Hand();

};

iBaloneyView.prototype.setup = function() {
    var clubCount = 0, heartCount = 0, spadeCount = 0, diamondCount = 0;
    
    for (var i = 0; i < 25; i++) {
	this.hand.receiveCards([this.deck.giveCard()]);
	var suit = this.deck.cards()[i].suit()
	if (suit == "C") clubCount++;
	if (suit == "H") heartCount++;
	if (suit == "S") spadeCount++;
	if (suit == "D") diamondCount++;
    }

console.log("clubs = ", clubCount++, " hearts = ", heartCount, " spades = ", spadeCount, " diamonds = ", diamondCount);
//    console.log(this.hand.toString());
};

iBaloneyView.prototype.displayHand = function() {
    
    // display some cards
    var handArea = document.querySelector(".hand");
    console.log("hand =", this.hand);
    for (var i = 0; i < this.hand.cards().length; i++) {
	var li = document.createElement("li");
	var image = new Image();
	var card = this.hand.cards()[i];
	image.src = "images/cards/" + card.toString() + ".png";
//	console.log("here im = ", image.src);
	li.appendChild(image);
	handArea.appendChild(li);
    }

    // display some status
    var statusArea = document.querySelector(".status-area");
    var pond = statusArea.querySelector(".pond");
    var li = pond.querySelector("li");
    li.textContent = "Pond has " + this.deck.cards().length + " cards";
    li = li.nextElementSibling;
    li.textContent = "Hand has " + this.hand.cards().length + " cards";
    newLi = document.createElement("li");
    newLi.textContent = "I wonder what happens here";
    li = li.appendChild(newLi);

    console.log(statusArea);
};


window.onload = function() {
    var view = new iBaloneyView(1);
    view.setup();
    view.displayHand();
};
