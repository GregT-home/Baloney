describe("JSON tests", function() {
    it("#fromJSON should create a game, just like the original, from a JSON string.", function() {

	tenClubs = new Card ("10-C");
	var tenJSON = JSON.stringify(tenClubs);
	var reconstituted = Card.fromJSON(tenJSON);

	expect(reconstituted.rank()).toEqual(tenClubs.rank());
	expect(reconstituted.suit()).toEqual(tenClubs.suit());
	expect(reconstituted.__proto__).toEqual(tenClubs.__proto__);
    });
});

describe("iBaloney Card", function() {
    var aceClubs, aceHearts
    var tenClubs, tenHearts

    beforeEach(function() {
	aceClubs = new Card("A-C")
	aceHearts = new Card("A-H")
	tenClubs = new Card("10-C")
	tenHearts = new Card("10-H")
    });

    describe ("#new: cards can be created from a 'R-S' string.", function() {
	it("They have rank and suit", function() {
	    expect(aceClubs).toBeDefined();
	    expect(aceClubs.rank()).toEqual(aceHearts.rank());
	    expect(aceClubs.suit()).not.toEqual(aceHearts.suit());
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

	it("#select marks a card as selected.", function() {
	    expect(tenClubs.unSelect().isSelected()).toBeFalsy();
	});

	it("#toString prints a string description of an unselected card.", function() {
	    expect(tenClubs.toString()).toEqual("10-C");
	});

	it("#toString prints a string description of a selected card.", function() {
	    expect(tenClubs.select().toString()).toEqual("10=C");
	});

	it("#toFileBaseName returns a name with lowercase suit and rank.", function() {
	    expect(aceHearts.toFileBaseName()).toEqual("ha");
	});
    });
}); // end Baloney Card tests
