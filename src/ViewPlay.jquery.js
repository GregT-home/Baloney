
window.onload = function() {
    var numberOfPlayers;
    while ((numberOfPlayers = ~~(11 * Math.random())) < 2);
    var view = new iBaloneyView(numberOfPlayers);
    view.setup();
    view.displayHand();
    view.displayHistory();
    view.displayInfo();
    view.displayPlayerStatus();
    console.log("windows.onload calling ready and view.setClickHand");
    $(document).ready(view.setClickHand);
};
