
window.onload = function() {
    var numberOfPlayers;
    while ((numberOfPlayers = ~~(11 * Math.random())) < 2);
    var view = new iBaloneyView(numberOfPlayers);
    view.setup();
    view.displayHand();
    view.displayHistory();
    view.displayInfo();
    view.displayPlayerStatus();
};
