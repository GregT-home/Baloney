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
	for (cardIndex in newCards)
	    this._cards.unshift(newCards[cardIndex]); 
    this.sort(); // will this cause test failures?
}
Hand.prototype.giveMatchingRank = function(targetRank) {
    index = this.indexOfMatchingCard(targetRank);
    if (typeof index != "undefined") {
	var card = this._cards[index];
	this._cards.splice(index, 1);
	return card;
    }
    return undefined;
}

Hand.prototype.giveSelected = function() {
    var cardList =  this._cards.filter(function (card) {
	if (card.isSelected())
	    return card;
    });
    this._cards = this._cards.filter(function (card) {
	if (!card.isSelected())
	    return card;
    });
    return cardList;
}

Hand.prototype.indexOfMatchingCard = function(targetRank, targetSuit){
    for (index in this._cards) {
	var card = this._cards[index];
	if (card.rank() == targetRank &&
	    (typeof targetSuit == "undefined" || card.suit() == targetSuit)) {
	    return index;
	}
    }	
    return undefined;
}

Hand.prototype.isCardSelectedFromRankSuit = function(targetRank, targetSuit){
    index = this.indexOfMatchingCard(targetRank);
    if (typeof index != "undefined")
	return this._cards[index].isSelected();
    return undefined;
}

Hand.prototype.selectCardFromRankSuit = function(targetRank, targetSuit){
    index = this.indexOfMatchingCard(targetRank);
    if (typeof index != "undefined") {
	return this._cards[index].select();
    }
    return undefined;
}

Hand.prototype.unSelectCardFromRankSuit = function(targetRank, targetSuit){
    index = this.indexOfMatchingCard(targetRank);
    if (typeof index != "undefined") {
	return this._cards[index].unSelect();
    }
    return undefined;
}


Hand.prototype.sort = function()     { this._cards.sort(function(a,b){return a-b});}
Hand.prototype.toString = function() { return "[" +this._cards.join(" ") + "]"; }


