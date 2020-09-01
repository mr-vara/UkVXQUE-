/**
 * All tests in the project are defined here
 */
function importTest(name, path) {
    describe(name, function () {
        require(path);
    });
}

var common = require("./common");

describe("Testing", function () {
    importTest("User", './user/user');
    importTest("Product", './product/product');
    after(function () {
        console.log("Testing Completed");
    });
});