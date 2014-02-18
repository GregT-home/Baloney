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

	it("#select marks a card as selected.", function() {
	    expect(ten_clubs.isSelected()).toBeFalsy();
	    expect(ten_clubs.select().isSelected()).toBeTruthy();
	});

	it("#select marks a card as selected.", function() {
	    expect(ten_clubs.unSelect().isSelected()).toBeFalsy();
	});

	it("#toString prints a string description of an unselected card.", function() {
	    expect(ten_clubs.toString()).toEqual("10-C");
	});

	it("#toString prints a string description of a selected card.", function() {
	    expect(ten_clubs.select().toString()).toEqual("10=C");
	});
    });
}); // end Baloney Card tests
