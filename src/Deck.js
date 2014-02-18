function Deck() {
    this._cards = [];
    var index = 0;
    for (var suit = 0; suit < Card.SUITS.length; suit++) {
	for (var rank = 0; rank < Card.RANKS.length; rank++) {
	    this._cards[index] = new Card(Card.RANKS[rank] + "-" + Card.SUITS[suit]);
//	    console.log("card[",index,"] = " + this._cards[index].toString());
	    index++;
	}
    }
}
Deck.prototype.cards = function(i) { return this._cards[i]; }
Deck.prototype.numberOfCards = function() { return this._cards.length; }
Deck.prototype.giveCard = function() { return this._cards.shift(); }
Deck.prototype.shuffle = function(){
    // courtesy of Stackoverflow.com/questions/2450954
    var currentIndex = this._cards.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
	// Pick a remaining element...
	randomIndex = Math.floor(Math.random() * currentIndex);
	currentIndex -= 1;
	// And swap it with the current element.
	temporaryValue = this._cards[currentIndex];
	this._cards[currentIndex] = this._cards[randomIndex];
	this._cards[randomIndex] = temporaryValue;
    }
}
