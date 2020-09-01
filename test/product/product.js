var common = require("../common");
var chai = common.chai;
var server = common.server;
var should = common.should;

describe ("Create", function() {
    describe ("Validation", function() {
        describe ("Without Token", function() {
            it("Should give 401 because, authenticated can only create Products", done => {
                chai.request(server)
                    .post("/api/products")
                    .send({
                        "title": "Bob",
                        "price": 99
                    })
                    .end((err,res) => {
                        res.should.have.status(401);
                        done();
                    });
            });
        });
    });

    describe ("Create Product", function() {
        describe ("With Token", function() {
            it("Should give 200 because, authenticated users can create Products", done => {
                chai.request(server)
                .post("/api/users/authenticate")
                .send({
                    "username": "bob",
                    "password": "password"
                })
                .end((err,res) => {
                    chai.request(server)
                    .post("/api/products")
                    .set('Authorization','Bearer '+res.body.token)
                    .send({
                        "title": "Bob",
                        "price": 99
                    })
                    .end((err,res) => {
                        res.should.have.status(200);
                    });
                    done();
                });
            });
        });
    });
});


describe ("Get", function() {
    describe ("Validation", function() {
        describe ("Without Token", function() {
            it("Should give 401 because, authenticated can only get Products", done => {
                chai.request(server)
                    .get("/api/products")
                    .send()
                    .end((err,res) => {
                        res.should.have.status(401);
                        done();
                    });
            });
        });
    });

    describe ("Get Products", function() {
        describe ("With Token", function() {
            it("Should give 200 because, authenticated users can get Products", done => {
                chai.request(server)
                .post("/api/users/authenticate")
                .send({
                    "username": "bob",
                    "password": "password"
                })
                .end((err,res) => {
                    chai.request(server)
                    .get("/api/products")
                    .set('Authorization','Bearer '+res.body.token)
                    .send()
                    .end((err,res) => {
                        res.should.have.status(200);
                    });
                    done();
                });
            });
        });
    });
});
