enum Player.Types = {HUMAN: 1, ROBOT: 2};

function Message() {
 list = {};
}

Message.prototype.add = function(abbrev, msg) { list.push({abbrev: msg}); }
Message.prototype.get = function(abbrev) { return list[abbrev];
// Message.prototype.toString = function(abbrev) ( return this.get(abbrev); }
// Message.prototype.valueOf = function(abbrev) ( return this.get(abbrev); }
