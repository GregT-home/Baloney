describe("iBaloney JSON Object extension tests", function() {
    it("#fromJSON should reconstitute an object, just like the original, from a JSON string.", function() {
	game = new Game();
	game.addPlayer(new Player(1, "One"));
	game.addPlayer(new Player(2, "Two"));

	var gameJSON = JSON.stringify(game, null, 2);
	var reconstituted = Game.fromJSON(gameJSON);
	//console.log("reconstituted game:", reconstituted);
	expect(reconstituted.started()).toEqual(game.started());
	expect(reconstituted.players(reconstituted.currentPlayer())).toBe(game.players(game.currentPlayer()));
	expect(reconstituted.numberOfPlayers()).toEqual(game.numberOfPlayers());
	expect(reconstituted.__proto__).toEqual(game.__proto__);
    });

});

