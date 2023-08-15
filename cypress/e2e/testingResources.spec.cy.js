/// <reference types="cypress" />


describe('testing search characters', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('Testing all characteres', () => {

        cy.intercept("GET", "https://rickandmortyapi.com/api/character").as(
            "characteres"
        );

        cy.wait("@characteres").then(xhr => {
            expect(xhr.response.statusCode).to.eq(200);

        })


        cy.get('.content')
            .should('exist')

        cy.get('[data-cy="character-0"]')
            .should('exist')

        cy.get('[data-cy="img-0"]')
            .should('exist')

        cy.get('[data-cy="character-0"] > .info-character > h2')
            .should('contain', 'Rick Sanchez')

    });

    it('Testing Search with filters , name and status(alive)', () => {


        cy.get('#name')
            .should('exist')
            .should('be.visible')
            .type('Rick')

        cy.get('#status')
            .should('exist')
            .should('be.visible')
            .select('alive')

        cy.get('.search')
            .should('exist')
            .should('be.visible')
            .click()


        cy.intercept("GET", "https://rickandmortyapi.com/api/character?name=Rick&status=alive").as(
            "searchCharacters"
        );

        cy.wait("@searchCharacters").then(xhr => {
            expect(xhr.response.statusCode).to.eq(200);

        })

    })

    it('Testing Search with filters , name and status(dead)', () => {


        cy.get('#name')
            .should('exist')
            .should('be.visible')
            .type('Rick')

        cy.get('#status')
            .should('exist')
            .should('be.visible')
            .select('dead')

        cy.get('.search')
            .should('exist')
            .should('be.visible')
            .click()


        cy.intercept("GET", "https://rickandmortyapi.com/api/character?name=Rick&status=dead").as(
            "searchCharacters"
        );

        cy.wait("@searchCharacters").then(xhr => {
            expect(xhr.response.statusCode).to.eq(200);

        })

    })

    it('Testing Search with filters , name and status(unknow)', () => {


        cy.get('#name')
            .should('exist')
            .should('be.visible')
            .type('Rick')

        cy.get('#status')
            .should('exist')
            .should('be.visible')
            .select('unknow')

        cy.get('.search')
            .should('exist')
            .should('be.visible')
            .click()


        cy.intercept("GET", "https://rickandmortyapi.com/api/character?name=Rick&status=unknow").as(
            "searchCharacters"
        );

        cy.wait("@searchCharacters").then(xhr => {
            expect(xhr.response.statusCode).to.eq(200);

        })

    })


})

describe('Testing Paginator', () => {
    beforeEach(() => {
        cy.visit('/')
    })


    it('Testing next page', () => {
        cy.get('[data-v-app=""] > #app > :nth-child(1) > .page-header > .navigation > .pagination > [data-cy="next-button"] > .btn')
            .should('be.visible')
            .should('be.enabled')
            .click()

        cy.wait(500)



    })
    it('Testing previous page', () => {
        cy.get('[data-v-app=""] > #app > :nth-child(1) > .page-header > .navigation > .pagination > [data-cy="prev-button"] > .btn')
            .should('be.disabled')
            .should('be.visible')

        cy.get('[data-v-app=""] > #app > :nth-child(1) > .page-header > .navigation > .pagination > [data-cy="next-button"] > .btn')
            .should('be.visible')
            .click()




        cy.get('[data-v-app=""] > #app > :nth-child(1) > .page-header > .navigation > .pagination > [data-cy="prev-button"] > .btn')
            .should('be.visible')
            .should('be.enabled')
            .click()

    })
    it('Testing last page', () => {
        cy.get('[data-v-app=""] > #app > :nth-child(1) > .page-header > .navigation > .pagination > [data-cy="last-button"] > .btn')
            .should('be.visible')
            .should('be.enabled')
            .click()



        cy.get('[data-v-app=""] > #app > :nth-child(1) > .page-header > .navigation > .pagination > [data-cy="last-button"] > .btn')
            .should('be.visible')
            .should('be.disabled')

    })
    it('Testing first page', () => {
        cy.get('[data-v-app=""] > #app > :nth-child(1) > .page-header > .navigation > .pagination > [data-cy="last-button"] > .btn')
            .should('be.visible')
            .should('be.enabled')
            .click()



        cy.get('[data-v-app=""] > #app > :nth-child(1) > .page-header > .navigation > .pagination > [data-cy="last-button"] > .btn')
            .should('be.visible')
            .should('be.disabled')


        cy.get('[data-v-app=""] > #app > :nth-child(1) > .page-header > .navigation > .pagination > [data-cy="first-button"] > .btn')
            .should('be.visible')
            .should('be.enabled')
            .click()





    })

})

