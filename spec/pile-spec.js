describe("Baloney Pile", function() {
    var pile;

    beforeEach(function() {
	pile = new Pile;
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

	it("#lengthOfLastAddition returns the number of Cards most recently added to the pile.", function() {
	    pile.lengthOfLastAddition().isEqual(3);
	});

	it("#isLastAdditionAllEqualToRank returns false if the most recently added cards were not of the target rank.", function() {
	    pile.LastAdditionAllEqualToRank("5").toBeFalsy;
	});

	it("#isLastAdditionAllEqualToRank returns true if the most recently added cards were not of the target rank.", function() {
	    pile = new Pile;
	    pile.receiveCards([new Card("5-H"),
			       new Card("5-D"),
			       new Card("5-S")]);

	    pile.LastAdditionAllEqualToRank("5").toBeTruthy;
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

}); // end Pile tests

