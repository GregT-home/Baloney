describe("iBaloney Card", function() {
    var aceClubs, aceHearts
    var tenClubs, tenHearts

    beforeEach(function() {
	aceClubs = new Card("a-c")
	aceHearts = new Card("A-H")
	tenClubs = new Card("10-c")
	tenHearts = new Card("10-H")
    });

    describe ("#new: cards can be created from a 'R-S' string.", function() {
	it("They have rank and suit", function() {
	    expect(aceClubs).toBeDefined();
	    expect(aceClubs.rank()).toEqual(aceHearts.rank());
	    expect(aceClubs.suit()).not.toEqual(aceHearts.suit());
	});

	it("Suits and Ranks always get mapped to upper case.", function() {
	    expect(aceClubs.rank()).toBe("A");
	    expect(aceClubs.suit()).toBe("C");
	});

	it("They have values based on rank only.", function() {
	    expect(aceHearts.valueOf()).toEqual(aceClubs.valueOf());
	    expect(tenHearts.valueOf()).not.toEqual(aceClubs.valueOf());
	});

	it("Higher ranks are greater than lower ranks.", function() {
	    expect(aceHearts.valueOf()).toBeGreaterThan(tenHearts.valueOf());
	});

	it("Lower ranks are less than higher ranks.", function() {
	    expect(tenClubs.valueOf()).toBeLessThan(aceHearts.valueOf());
	});

	it("#select marks a card as selected.", function() {
	    expect(tenClubs.isSelected()).toBeFalsy();
	    expect(tenClubs.select().isSelected()).toBeTruthy();
	});

	it("#unSelect removes the selection mark.", function() {
	    expect(tenClubs.unSelect().isSelected()).toBeFalsy();
	});

	it("#toString prints a string description of an unselected card.", function() {
	    expect(tenClubs.toString()).toEqual("10-C");
	});

	it("#toString prints a different string description of a selected card.", function() {
	    expect(tenClubs.select().toString()).toEqual("10=C");
	});

    });
}); // end Baloney Card tests
