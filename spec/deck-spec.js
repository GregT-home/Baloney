// Test method for examining cards
Deck.prototype.peek = function(index) { return this._cards[index]; }

describe("iBaloney Deck", function() {
    var deck;

    beforeEach(function() {
	deck = new Deck();
    });

    describe("#new, a deck can be created and contains cards.", function() {
	it("#new creates a standard 52-card deck", function() {
	    expect(deck).toBeDefined();
	    expect(deck.numberOfCards()).toEqual(52);
	});

	it("#giveCard gives a card from the deck.", function() {
	    var card = deck.giveCard();
	    expect(card).toBeDefined();
	});

	it("#giveCard gives undefined if there are no more cards.", function() {
	    var card;
	    for (var i = 0; i < 52; i++) {
		card = deck.giveCard();
	    }
	    expect(card).toBeDefined();
		
	    card = deck.giveCard();
	    expect(card).not.toBeDefined();
	});

	it("#peek (test-only) allows a given card in the deck to be examined.", function() {
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
	    expect(deck.cards(0)).toBeDefined();

	    var clubCount = heartCount = spadeCount = diamondCount = 0;
	    for (var i = 0; i < 52; i++) {
		var suit = deck.cards(i).suit()
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
	var cards = { 1: deck.peek(1), 29: deck.peek(29), 49: deck.peek(49)};
	deck.shuffle();
	aggregateAnd = (cards[1] == deck.peek(1))
	    && (cards[29] == deck.peek(29))
	    && (cards[49] == deck.peek(49));
	expect(aggregateAnd).toBeFalsy();
    });
});

