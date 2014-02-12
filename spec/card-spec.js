describe("Baloney Card", function() {
    var ace_clubs, ace_hearts
    var ten_clubs, ten_hearts

    beforeEach(function() {
	ace_clubs = new Card("A-C")
	ace_hearts = new Card("A-H")
	ten_clubs = new Card("10-C")
	ten_hearts = new Card("10-H")
    });

    describe ("#new: cards can be created from a 'R-S' string.", function() {
	it("They have rank and suit", function() {
	    expect(ace_clubs).toBeDefined();
	    expect(ace_clubs.rank()).toEqual(ace_hearts.rank());
	    expect(ace_clubs.suit()).not.toEqual(ace_hearts.suit());
	});

	it("They have values based on rank only.", function() {
	    expect(ace_hearts.valueOf()).toEqual(ace_clubs.valueOf());
	    expect(ten_hearts.valueOf()).not.toEqual(ace_clubs.valueOf());
	});

	it("Higher ranks are greater than lower ranks.", function() {
	    expect(ace_hearts.valueOf()).toBeGreaterThan(ten_hearts.valueOf());
	});

	it("Lower ranks are less than higher ranks.", function() {
	    expect(ten_clubs.valueOf()).toBeLessThan(ace_hearts.valueOf());
	});

	it("#toString prints a string description of the card.", function() {
	    expect(ten_clubs.toString()).toEqual("10-C");
	});

	it("#toString prints a string description of the card.", function() {
	    
	    expect(ten_clubs.toString()).toEqual("10-C");
	});
    });
}); // end Baloney Card tests
