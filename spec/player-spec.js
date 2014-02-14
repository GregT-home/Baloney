describe("iBaloney Player", function() {
    describe ("a Player has a number, name and hand.", function() {
	var player;
	var testName = "Mr. One-Oh-Eight";

	it("#new: a player can be created", function() {
	    player = new Player(108, testName, new Hand());
	});

	it("it holds a number.", function() {
	    expect(player.number()).toBeDefined();
	    expect(player.number()).toBe(108);
	});

	it("it holds a name.", function() {
	    expect(player.name()).toBeDefined();
	    expect(player.name()).toBe(testName);
	});

	it("it holds a hand.", function() {
	    expect(player.hand()).toBeDefined();
	    player.hand().receive([new Card("A-H"), new Card("6-C")]);
    	    expect(player.hand().numberOfCards()).toBe(2);
	});
	
	it("it can be sent a message.", function() {
	    var testMsg = "This is a test";
	    player.messages(true);
	    player.tell(testMsg);
	    expect(player.messages(false)).toEqual([testMsg]);
	    expect(player.messages(true)).toEqual([testMsg]);
	    expect(player.messages(true)).toEqual([]);
	});

    });
}); // end Baloney Player tests
