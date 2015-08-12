describe("iBaloney JSON Object extension tests", function() {
  it("#fromJSON should reconstitute an object, just like the original, from a JSON string.", function() {
    game = new Game();
    game.addPlayer(new Player(1, "One"));
    game.addPlayer(new Player(2, "Two"));

    var gameJSON = JSON.stringify(game, null, 2); // format errors w/ 2 spaces per level
    var reconstituted = Object.fromJSON(gameJSON);
    expect(reconstituted.started()).toEqual(game.started());
    expect(reconstituted.players(reconstituted.currentPlayer())).toBe(game.players(game.currentPlayer()));
    expect(reconstituted.numberOfPlayers()).toEqual(game.numberOfPlayers());
    expect(reconstituted.__proto__).toEqual(game.__proto__);

    // second example
    var player = new Player(1, "One");
    var playerJSON = JSON.stringify(player, null, 2);
    reconstituted = Object.fromJSON(playerJSON);
    expect(reconstituted.__proto__).toEqual(player.__proto__);
  });

});

