function Hand() {
    this._cards = [];
}
Hand.prototype.cards = function(i)    { return this._cards[i]; }
Hand.prototype.numberOfCards = function()   { return this._cards.length; }
Hand.prototype.giveCard = function() { return this._cards.shift(); }
Hand.prototype.receive = function(newCards) {
    if (newCards instanceof Card)
	this._cards.unshift(newCards); 
    else
	newCards.forEach(function(element) { this._cards.unshift(element) }, this);
    this.sort();
}
Hand.prototype.giveMatchingRank = function(rank) {
    for (var i = 0; i < this._cards.length; i++) {
    	if (this._cards[i].rank() == rank) {
    	    var card = this._cards[i];
    	    this._cards.splice(i, 1);
    	    return card;
    	}	    
    }
    return undefined;
}
Hand.prototype.giveAllMatchingRank = function(rank) {
    var cards = [];
    var card;
    while (card = this.giveMatchingRank(rank))
	cards.push(card);
    return cards;
}
Hand.prototype.giveCard = function() { return this._cards.shift(); }
Hand.prototype.countMatchingRank = function(rank) {
    var rankList = this._cards.filter(function (card) {
	return(card.rank() == rank)
    });
    return rankList.length;
}

Hand.prototype.giveSelected = function() {
    var cardList =  this._cards.filter(function (card) { return card.isSelected() });
    this._cards = this._cards.filter(function (card) { return !card.isSelected() });
    return cardList;
}

Hand.prototype.sort = function()     { this._cards.sort(function(a,b){return a-b});}
Hand.prototype.toString = function() { return "[" +this._cards.join(" ") + "]"; }


