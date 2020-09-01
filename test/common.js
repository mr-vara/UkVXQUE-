var chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();
chai.use(chaiHttp);

exports.chai = chai;
exports.chaiHttp = chaiHttp;
exports.server = server;
exports.assert = chai.assert;
exports.should = should;
