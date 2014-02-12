function Hand() {
    this._cards = [];
}
Hand.prototype.cards = function()    { return this._cards; }
Hand.prototype.length = function()   { return this._cards.length; }
//Hand.prototype.giveCard = function() { return this._cards.shift(); }
Hand.prototype.receiveCards = function(newCards) {
    for (cardIndex in newCards) {
	this._cards.unshift(newCards[cardIndex]); 
    }
}
Hand.prototype.giveMatchingRank = function(targetRank) {
    for (cardIndex in this._cards) {
	var card = this._cards[cardIndex];
	if (card.rank() == targetRank) {
	    this._cards.splice(cardIndex, 1);
	    return card;
	}
    }	
    return undefined;
}
Hand.prototype.sort = function()     { this._cards.sort(function(a,b){return a-b});}
Hand.prototype.toString = function() { return "[" +this._cards.join(" ") + "]"; }


