describe("Baloney Discard", function() {
    var hand;
    var deck;
    var pile;

    beforeEach(function() {
	deck = new Deck;
	hand = new Hand;
	pile = new Pile;
	discard = new Discard
    });

    it("#new creates an empty pile", function() {
	expect(pile).toBeDefined();
    });

    describe("Cards in a pile can be received, counted and given", function() {
	it("#receiveCards can receive an array of cards", function() {
	    pile.receiveCards([new Card("5-H"),
			       new Card("3-D"),
			       new Card("4-S")]);
	});

	it("#length gives the size of a pile", function() {
	    expect(pile.length()).toEqual(3);
	});

	it("#giveAllCards gives all cards in the pile", function() {
	    var cards = pile.giveAllCards();
	    expect(cards.length()).toEqual(3);
	});
    });


    it("#toString shows a string representing the pile", function() {
	pileString = pile.toString();
	expect(pile.toString()).toEqual("[tbd]");
    });

}); // end Discard tests

