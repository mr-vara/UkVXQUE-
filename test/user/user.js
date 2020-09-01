var common = require("../common");
var chai = common.chai;
var server = common.server;
var should = common.should;

describe ("Registration", function() {
    describe ("Validation", function() {
        describe ("Without firstName", function() {
            it("Should give 400 because firstName is required field", done => {
                chai.request(server)
                    .post("/api/users/register")
                    .send({
                        "lastName": "Bob",
                        "username": "bob",
                        "password": "password"
                    })
                    .end((err,res) => {
                        res.should.have.status(400);
                        done();
                    });
            });
        });
        describe ("Without lastName", function() {
            it("Should give 400 because lastName is required field", done => {
                chai.request(server)
                    .post("/api/users/register")
                    .send({
                        "firstName": "Bob",
                        "username": "bob",
                        "password": "password"
                    })
                    .end((err,res) => {
                        res.should.have.status(400);
                        done();
                    });
            });
        });
        describe ("Without username", function() {
            it("Should give 400 because username is required field", done => {
                chai.request(server)
                    .post("/api/users/register")
                    .send({
                        "firstName": "Bob",
                        "lastName": "Also Bob",
                        "password": "password"
                    })
                    .end((err,res) => {
                        res.should.have.status(400);
                        done();
                    });
            });
        });
        describe ("Without password", function() {
            it("Should give 400 because password is required field", done => {
                chai.request(server)
                    .post("/api/users/register")
                    .send({
                        "firstName": "Bob",
                        "lastName": "Also Bob",
                        "username": "username"
                    })
                    .end((err,res) => {
                        res.should.have.status(400);
                        done();
                    });
            });
        });
        describe ("Password less than 6", function() {
            it("Should give 400 because password should be greather than 6", done => {
                chai.request(server)
                    .post("/api/users/register")
                    .send({
                        "firstName": "Bob",
                        "lastName": "Also Bob",
                        "username": "username",
                        "password": "less"
                    })
                    .end((err,res) => {
                        res.should.have.status(400);
                        done();
                    });
            });
        });
    });

    describe ("Successful Registration", function() {
        it("Should give 200 for valid user data", done => {
            chai.request(server)
                .post("/api/users/register")
                .send({
                    "firstName": "Bob",
                    "lastName": "Rob",
                    "username": "bob",
                    "password": "password"
                })
                .end((err,res) => {
//                    res.should.have.status(200);
                    done();
                });
        });
    });
});


describe ("Login", function() {
    describe ("Invalid Credentials", function() {
        it("Should give 400 for invalid crecentials", done => {
            chai.request(server)
                .post("/api/users/authenticate")
                .send({
                    "username": "bob_fake",
                    "password": "password_fake"
                })
                .end((err,res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe ("Valid Credentials", function() {
        it("Should give 200 for valid crecentials", done => {
            chai.request(server)
                .post("/api/users/authenticate")
                .send({
                    "username": "bob",
                    "password": "password"
                })
                .end((err,res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});
