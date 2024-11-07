const LOGINID = "testuser1@test.com";
const LOGINPASS = "testuser1";

describe("Login Page Tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.wait(2000);
  });

  it("Should show validation errors when fields are empty", () => {
    // Click the login button without filling in the form
    cy.get("button").contains("Login").click();

    // Check that validation errors appear
    cy.get(".text-red-500").should("contain.text", "Email is required");
    cy.get(".text-red-500").should("contain.text", "Password is required");
  });

  it("Should show error for invalid email format", () => {
    // Enter an invalid email and a valid password
    cy.get('input[placeholder="Email"]').type("invalidformat"); // Type the username
    cy.get('input[placeholder="Password"]').type("invalidpassword"); // Type the password

    cy.get("button").contains("Login").click(); // Click the login button

    // Check that an error message for the email is displayed
    cy.get(".text-red-500").should("contain.text", "Invalid email format");
  });

  it("Should successfully login with valid credentials", () => {
    // Enter valid email and password
    cy.get('input[placeholder="Email"]').type(LOGINID); // Type the username
    cy.get('input[placeholder="Password"]').type(LOGINPASS); // Type the password

    cy.get("button").contains("Login").click(); // Click the login button

    // Verify redirection to the dashboard page
    cy.url().should("include", "/dashboard");
  });
});
