/* eslint-disable no-undef */
describe('Pizza Test', () => {
    it('can navigate to http://localhost:3000', () => {
        cy.visit('http://localhost:3000/pizza')
        cy.url().should('include', 'localhost')
    })
    describe("Inputs Test", () => {
        it('can get name input', () => {
            cy.get("input[name='name']")
            .type("Audrey")
            .should("have.value", "Audrey")
        })
    describe("Toppings Test", () => {
        it('can select topping', () => {
            cy.get('input[name="sausage"]').check().should('be.checked', 'checked')
            cy.get('input[name="pepperoni"]').check().should('be.checked', 'checked')
            cy.get('input[name="bacon"]').check().should('be.checked', 'checked')
            cy.get('input[name="anchovies"]').check().should('be.checked', 'checked')
        })
        })
    describe("Data Submission Test", () => {
        it("user can submit data", () => {
            cy.get('form').submit()
        })
    })
    })
}) 