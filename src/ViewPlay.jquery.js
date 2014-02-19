
window.onload = function() {
    var numberOfPlayers;
    while ((numberOfPlayers = ~~(6 * Math.random())) < 2);
    var view = new iBaloneyView(numberOfPlayers);
    view.setup();
};
