import { constants } from "../../../src/utils/constants";

/// <reference types="cypress" />
// About API testing for TH Courses
describe(`Check ${constants.API_SERVICE_URL} request`, () => {
  it("Get 200 status", () => {
    cy.request({
      method: "GET",
      url: `${constants.API_SERVICE_URL}?query=math`,
    }).as("getCourses");

    cy.get("@getCourses").should((response) => {
      expect(response.status).to.eq(200);
      expect(response).to.have.property("body");
    });
  });
});
