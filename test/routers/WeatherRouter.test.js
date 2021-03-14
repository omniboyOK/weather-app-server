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

  it("GET /location - 404", function (done) {
    request("http://localhost:3001")
      .get("/v1/location")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        res.body.should.have.property("error");
        res.body.error.should.equal("could not get location");
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

  it("GET /current/:city? - Empty String", function (done) {
    request("http://localhost:3001")
      .get("/v1/current/ ")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        res.body.should.have.property("error");
        res.body.error.should.equal("couldn't get location by ip");
        done();
      });
  });

  it("GET /forecast/:city? - La Plata", function (done) {
    request("http://localhost:3001")
      .get("/v1/forecast/LaPlata")
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

  it("GET /current/:city? - No city or Ip", function (done) {
    request("http://localhost:3001")
      .get("/v1/current/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        res.body.should.have.property("error");
        res.body.error.should.equal("Could not get location");
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
        res.body.should.have.property("days");
        res.body.days.should.not.equal(null);
        done();
      });
  });
});
