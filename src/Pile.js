function Pile() {
    this._cards = [];
    this._last_addition_length = 0;
}
Pile.prototype.cards  = function() { return this._cards; }
Pile.prototype.length = function() { return this._cards.length; }
Pile.prototype.lengthOfLastAddition = function() { return this._last_addition_length; }
Pile.prototype.receiveCards = function(newCards) {
    for (var cardIndex = 0; cardIndex < newCards.length; cardIndex++) {
	this._cards.unshift(newCards[cardIndex]); 
	this._last_addition_length = newCards.length;
    }
}
Pile.prototype.doCardsMatchRank = function(rank) {
    return this._cards.every(function (element) { return element.rank() == rank });
}
Pile.prototype.giveAllCards = function() {
    var cards = this._cards;
    this._cards = [];
    return cards;
}
Pile.prototype.toString = function() { return "[" +this._cards.join(" ") + "]"; }

