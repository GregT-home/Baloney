describe("iBaloney Game", function() {
    var game, players;

    it("#new: games can be created", function() {
	game = new Game();
	expect(game).toBeDefined();
    });

    it("#addPlayers: players can be added", function() {
	var tmpNames = ["First", "Second", "Third"];
	expect(game).toBeDefined();
	for (var i = 0; i < 3.; i++) {
	    game.addPlayer(new Player(i+1, tmpNames[i], new Hand()));
	}
    });

    it(".players can be be counted after being added", function() {
	expect(game).toBeDefined();
	expect(game.numberOfPlayers()).toBe(3);
    });

    it("#start: games can be started", function() {
	expect(game).toBeDefined();
	expect(game.started()).toBeFalsy();
	game.start();
	expect(game.started()).toBeTruthy();
    });

    describe("Running games have properties of interest.", function() {
	it("They have players.", function() {
	    expect(game.numberOfPlayers()).toBe(3);
	});

	it("They have a current player.", function() {
	    expect(game.currentPlayer()).toBeDefined();
	});

	it("The current player advances one-by-one in a loop.", function() {
	    var startingPlayer = game.currentPlayer();
	    for (var i = 0; i < (game.numberOfPlayers() - 1); i++){
		game.advanceToNextPlayer();
		expect(game.currentPlayer().name()).not.toBe(startingPlayer.name());
	    }
	    game.advanceToNextPlayer();
	    expect(game.currentPlayer()).toBe(startingPlayer);
	});

	it("The currentDiscardRank moves forward through the ranks.", function() {
	    var startingRank = game.currentDiscardRank();
	    var previousRank = startingRank;

	    for (var i = 0; i < Card.RANKS.length - 1; i++){
		game.advanceToNextPlayer();
		expect(game.currentDiscardRank()).not.toBe(previousRank);
		previousRank = game.currentDiscardRank();
	    }

	    game.advanceToNextPlayer();
	    expect(game.currentDiscardRank()).toBe(startingRank);
	});
    });
});
