// Test method for examining cards
Deck.prototype.peek = function(index) { return this._cards[index]; }

describe("Baloney Deck", function() {
    var deck;

    beforeEach(function() {
	deck = new Deck();
    });

    describe("#new, a deck can be created and contains cards.", function() {
	it("#new creates a standard 52-card deck", function() {
	    expect(deck).toBeDefined();
	    expect(deck.length()).toEqual(52);
	});

	it("#giveCard gives a card from the deck", function() {
	    var card = deck.giveCard();
	    expect(card).toBeDefined();

	});

	it("#peek allows a given card in the deck to be examined", function() {
	    var card = deck.peek(5);
	    expect(card).toBeDefined();
	    var card2;

	    for (var i = 0; i <= 5; i++) {
		card2 = deck.giveCard();
	    }
	    expect(card.rank()).toEqual(card2.rank());
	    expect(card.suit()).toEqual(card2.suit());
	});

	it("#it is a standard 52-card deck", function() {
	    expect(deck.cards()[0]).toBeDefined();

	    var clubCount = heartCount = spadeCount = diamondCount = 0;
	    for (var i = 0; i < 52; i++) {
		var suit = deck.cards()[i].suit()
		if (suit == "C") clubCount++;
		if (suit == "H") heartCount++;
		if (suit == "S") spadeCount++;
		if (suit == "D") diamondCount++;
	    }
	    expect(clubCount).toEqual(13);
	    expect(heartCount).toEqual(13);
	    expect(spadeCount).toEqual(13);
	    expect(diamondCount).toEqual(13);
	});
    });

    it("#shuffle changes the order of the deck", function() {
	var card1 = deck.peek(1);
	var card29 = deck.peek(29);
	var card51 = deck.peek(51);
	for(var i = 0; i < deck.length; i++) {
	    var card = deck.giveCard();
	    if (i == 1) card1 = card;
	    if (i == 29) card29 = card;
	    if (i == 51) card51 = card;
	}

	deck.shuffle();

	var newCard1 = deck.peek(1);
	var newCard29 = deck.peek(29);
	var newCard51 = deck.peek(51);
	for(var i = 0; i < deck.length; i++) {
	    var card = deck.giveCard();
	    if (i = 1) newCard1 = card;
	    if (i = 29) newCard29 = card;
	    if (i = 51) newCard51 = card;
	}

	expect(card1).not.toEqual(newCard1);
	expect(card29).not.toEqual(newCard29);
	expect(card51).not.toEqual(newCard51);
    });
});

