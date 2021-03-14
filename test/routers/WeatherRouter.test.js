const should = require("should");
const request = require("supertest");

describe("Weather Router", function () {
  it("GET /ping", function (done) {
    request("http://localhost:3001")
      .get("/ping")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        res.body.should.have.property("message");
        res.body.message.should.equal("pong");
        done();
      });
  });
  it("GET /location - 200", function (done) {
    request("http://localhost:3001")
      .get("/v1/location")
      .set("X-Forwarded-For", "181.231.41.170")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        res.body.should.have.property("city");
        res.body.city.should.not.equal(null);
        done();
      });
  });

  it("GET /location - Null", function (done) {
    request("http://localhost:3001")
      .get("/v1/location")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        res.body.should.be.String();
        res.body.should.equal("Buenos Aires");
        done();
      });
  });

  it("GET /current/:city? - La Plata", function (done) {
    request("http://localhost:3001")
      .get("/v1/current/La Plata")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        res.body.should.have.property("weather");
        res.body.weather.should.not.equal(null);
        res.body.should.have.property("name");
        res.body.name.should.equal("La Plata");
        done();
      });
  });

  it("GET /current/:city? - No city or Ip", function (done) {
    request("http://localhost:3001")
      .get("/v1/current/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        res.body.should.have.property("weather");
        res.body.weather.should.not.equal(null);
        res.body.should.have.property("name");
        res.body.name.should.equal("Buenos Aires");
        done();
      });
  });

  it("GET /forecast/:city? - La Plata", function (done) {
    request("http://localhost:3001")
      .get("/v1/forecast/La Plata")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        res.body.should.have.property("city");
        res.body.should.have.property("list");
        res.body.city.name.should.equal("La Plata");
        done();
      });
  });

  it("GET /forecast/:city? - Null", function (done) {
    request("http://localhost:3001")
      .get("/v1/forecast/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        res.body.should.have.property("city");
        res.body.should.have.property("list");
        res.body.city.name.should.equal("Buenos Aires");
        done();
      });
  });
});
