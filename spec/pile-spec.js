describe("Baloney Pile", function() {
    var pile;

    it("#new creates an empty pile", function() {
	pile = new Pile;
	expect(pile).toBeDefined();
    });

    describe("Cards in a pile can be received, counted and given", function() {
	it("#receiveCards can receive an array of cards", function() {
	    pile.receiveCards([new Card("5-H"),
			       new Card("3-D"),
			       new Card("4-S")]);
	});

	it("#lengthOfLastAddition returns the number of Cards most recently added to the pile.", function() {
	    expect(pile).toBeDefined();
	    expect(pile.lengthOfLastAddition()).toEqual(3);
	});

	it("#doCardsMatchRank returns false if the most recently added cards were not of the target rank.", function() {
	    expect(pile.doCardsMatchRank("Q")).toBeFalsy();
	});

	it("#doCardsMatchRank returns true if the most recently added cards were not of the target rank.", function() {
	    pile = new Pile;
	    pile.receiveCards([new Card("5-H"),
			       new Card("5-D"),
			       new Card("5-S")]);

	    expect(pile.doCardsMatchRank("5")).toBeTruthy();
	});
	
	it("#length gives the size of a pile", function() {
	    expect(pile.length()).toEqual(3);
	});

	it("#giveAllCards gives all cards in the pile", function() {
	    var cards = pile.giveAllCards();
	    expect(cards.length).toEqual(3);
	    expect(pile.length()).toEqual(0);
	    pile.receiveCards(cards);
	});
    });

    it("#toString shows a string representing the pile", function() {
	pileString = pile.toString();
	expect(pile.toString()).toEqual("[5-H 5-D 5-S]");
    });

}); // end Pile tests

