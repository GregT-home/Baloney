describe("iBaloney Message", function() {
    var msg = new MessageLibrary();

    it("#new message libraries can be created.", function() {
	expect(new MessageLibrary()).toBeDefined());
    });


    it("#add puts a new message into the library", function() {
	msg = new MessageLibrary();
	testKey = "test";
	testMsg = "This is a test"
	msg.add(testKey, testMsg);

	expect(msg.get(testKey).toBe(testMsg);
    });

    it("Non-existent keys return 'undefined'", function() {
	expect(msg.get("BadKey").toBe("undefined");
    });
}); // end Baloney Message tests
