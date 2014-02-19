describe("iBaloney Game JSON tests", function() {
    it("#fromJSON should create a game, just like the original, from a JSON string.", function() {
	game = new Game();
	game.addPlayer(new Player(1, "One"));
	game.addPlayer(new Player(2, "Two"));

	var gameJSON = JSON.stringify(game, null, 2);
	var reconstituted = Game.fromJSON(gameJSON);
//console.log("JSON for game:", gameJSON);
//console.log("-------");
// for (thing in game) {
//     console.log("thing = %s, typeof = %s", thing, typeof game[thing]);
// console.log("Object.prototype.toString.call(game[thing]) = %s", Object.prototype.toString.call(game[thing]));
//     if (Object.prototype.toString.call(game[thing]) === '[object Array]')
// 	console.log("%s is an array", thing);
// }
	console.log("game.player(0) = ", game.players(0));
	console.log("game.player(1) = ", game.players(1));
console.log("reconstituted game:", reconstituted);
	expect(reconstituted.started()).toEqual(game.started());
	expect(reconstituted.players(reconstituted.currentPlayer())).toBe(game.players(game.currentPlayer()));
	expect(reconstituted.numberOfPlayers()).toEqual(game.numberOfPlayers());
	expect(reconstituted.__proto__).toEqual(game.__proto__);
    });

});

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
	    for (var i = 0; i<2; i++){
		game.advanceToNextPlayer();
		expect(game.currentPlayer().name()).not.toBe(startingPlayer.name());
	    }
	    game.advanceToNextPlayer();
	    expect(game.currentPlayer()).toBe(startingPlayer);

	});
    });
});
