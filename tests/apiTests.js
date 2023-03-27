import chai from "chai";
import { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";

chai.use(chaiHttp);

//For Getting All the Insights
describe("GET /api/listAll", () => {
  it("Should get all the Insights from DB", (done) => {
    chai
      .request(app)
      .get("/api/listAll")
      .set("content-type", "application/json")
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });
});

//For Saving all the Insights
describe("POST /api/saveInsights", () => {
  it("Should save the Domain to DB and return the saved Contents", (done) => {
    const domain = { url: "https://www.google.com" };
    chai
      .request(app)
      .post("/api/saveInsights")
      .send(domain)
      .set("content-type", "application/json")
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("name", domain.url);
        expect(res.body).to.have.property("fav", false);
        expect(res.body).to.have.property("count", "18");
        expect(res.body).to.have.property("timestamp");
        done();
      });
  });

  it("Should not Save the data if the URL is Incorrect", (done) => {
    const domain = { url: "google.com" };
    chai
      .request(app)
      .post("/api/saveInsights")
      .send(domain)
      .set("content-type", "application/json")
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        expect(res).to.have.status(400);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("message", "Failed to get Insights");
        expect(res.body).to.have.property("error", "The URL is not valid");
        done();
      });
  });
});
//Tests for deleting the domain.
describe("DELETE /api/deleteInsightById", () => {
  it("Should delete the insight based on the id Given", (done) => {
    const body = { id: "6421445ea38bb87af628d840" };
    chai
      .request(app)
      .delete("/api/deleteInsightById")
      .send(body)
      .set("content-type", "application/json")
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("message", "No. of Rows Deleted: 1");
        done();
      });
  });

  it("Should throw an error and give status 400 when id is not provided", (done) => {
    chai
      .request(app)
      .delete("/api/deleteInsightById")
      .send()
      .set("content-type", "application/json")
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        expect(res).to.have.status(400);
        expect(res.body).to.be.an("object");
        expect(res.body)
          .to.have.property("message")
          .that.match(/Failed to delete the insight/i);
        expect(res.body)
          .to.have.property("error")
          .that.match(/Id is missing/i);
        done();
      });
  });
  it("Should throw an error and give status 400 when provided id is invalid", (done) => {
    const body = { id: "6420a261" };
    chai
      .request(app)
      .delete("/api/deleteInsightById")
      .send(body)
      .set("content-type", "application/json")
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        expect(res).to.have.status(400);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("error");
        done();
      });
  });
});

// //Updating the Fav

describe("PUT /api/updateFavorite", () => {
  it("Should update the favorite to true based on the url Given", (done) => {
    const body = { url: "https://www.google.com" };
    chai
      .request(app)
      .put("/api/updateFavorite")
      .send(body)
      .set("content-type", "application/json")
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        done();
      });
  });

  it("Should throw an error and give status 400 when url is not provided", (done) => {
    chai
      .request(app)
      .put("/api/updateFavorite")
      .send()
      .set("content-type", "application/json")
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        expect(res).to.have.status(400);
        expect(res.body).to.be.an("object");
        expect(res.body)
          .to.have.property("message")
          .that.match(/Failed to update the favorite/i);
        expect(res.body)
          .to.have.property("error")
          .that.match(/URL is missing/i);
        done();
      });
  });
  it("Should throw an error and give status 400 when provided url is not available in the db", (done) => {
    const body = { url: "https://www.gaana.com" };
    chai
      .request(app)
      .put("/api/updateFavorite")
      .send(body)
      .set("content-type", "application/json")
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        expect(res).to.have.status(400);
        expect(res.body).to.be.an("object");
        expect(res.body)
          .to.have.property("message")
          .that.match(/Failed to update the favorite/i);
        expect(res.body).to.have.property(
          "error",
          `The Url:${body.url} does not exist in DB`
        );
        done();
      });
  });
});
