describe("Blog app", () => {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/test/reset`);
    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salasana",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    //Second user created for the testing of the delete button.
    const userTwo = {
      name: "Timo Tappara",
      username: "timtapp",
      password: "salasana",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, userTwo);
    cy.visit("");
  });

  it("Login form in shown", function () {
    cy.contains("login").click();
    cy.get("#username");
    cy.get("#password");
  });
  describe("Login", function () {
    it("is successful with the right credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("salasana");
      cy.get("#login-button").click();
      cy.get("html").should("contain", "Matti Luukkainen logged in");
    });
    it("fails with the wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("lol");
      cy.get("#password").type("lol");
      cy.get("#login-button").click();

      cy.get("#notification")
        .should("contain", "Wrong username or password!")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");

      cy.get("html").should("not.contain", "Matti Luukkainen logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      //The login command is stored in the commands.js file
      cy.login({ username: "mluukkai", password: "salasana" });
    });
    describe("A blog can be added", function () {
      beforeEach(function () {
        //This blog is initialized in the cypress config file
        //The method handling the adding of a blogpost is in the commands.js file.
        cy.addBlog(Cypress.env("blog"));
      });

      it("It can be viewed", function () {
        cy.contains("Ninja skills").contains("View").click();
        cy.contains("Delete");
        cy.contains("Close");
        cy.contains("like");
      });

      it("It can be liked", function () {
        cy.contains("Ninja skills").contains("View").click();
        cy.contains("like").click();
        cy.contains("likes 501");
      });
      it("The creator can delete the blog", function () {
        cy.contains("Ninja skills").contains("View").click();
        cy.contains("Delete").click();
        cy.get("html").should("not.contain", "Ninja skills");
      });
      it("The delete button can be only seen by the creator", function () {
        //Logout the current user and log in the second user created in the beginning
        cy.contains("Logout").click();
        cy.login({ username: "timtapp", password: "salasana" });
        cy.contains("Ninja skills").contains("View").click();
        cy.get("Delete").should("not.exist");
      });
      it("Blogs are ordered by amount of likes", function () {
        cy.addBlog(Cypress.env("blogWith100likes"));
        cy.addBlog(Cypress.env("blogWith123likes"));

        cy.contains("Ninja skills").contains("View").click();
        cy.contains("Parhaat kalapaikat").contains("View").click();
        cy.contains("Kuntosali blogi").contains("View").click();
        cy.get(".blog").eq(0).should("contain", "Ninja skills");
        cy.get(".blog").eq(1).should("contain", "Parhaat kalapaikat");
        cy.get(".blog").eq(2).should("contain", "Kuntosali blogi");
      });
    });
  });
});
