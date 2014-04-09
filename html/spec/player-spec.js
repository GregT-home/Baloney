describe("iBaloney Player", function() {
    describe ("a Player has a number, name, type, and hand.", function() {
	var player;
	var testNumber = 108;
	var testName = "Mr. One-Oh-Eight";

 	var player2;
 	var testNumber2 = 109;
 	var testName2 = "Mr. One-Oh-Nine";

 	it("#new: a player can be created as a ROBOT or a HUMAN", function() {
 	    player = new Player(testNumber, testName, Player.TYPES.HUMAN);
 	    player2 = new Player(108, testName, Player.TYPES.ROBOT);

 	    expect(player.isHuman()).toBeTruthy();
 	    expect(player2.isHuman()).toBeFalsy();
 	});

 	it("#new: a player is human by default.", function() {
 	    player = new Player(testNumber, testName);
 	    expect(player.isHuman()).toBeTruthy();
 	});

	it("#new: a player can be created", function() {
            player = new Player(108, testName);
	    expect(player).toBeDefined();
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

	it("it holds a possible discard pile.", function() {
	    expect(player.maybeDiscard()).toBeDefined();
	    player.maybeDiscard().receiveCards([new Card("A-H"), new Card("6-C")]);
    	    expect(player.maybeDiscard().numberOfCards()).toBe(2);
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
