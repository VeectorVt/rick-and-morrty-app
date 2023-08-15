
import PaginatorList from '@/components/PaginatorList.vue'


/// <reference types="cypress" />
describe('<PaginatorList  />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(PaginatorList)
    })

    it('renders button first page', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(PaginatorList, {
            props: {
                items: 100
            }
        })
            .get('[data-cy="first-button"]')
            .should('be.visible')
            .and('be.disabled')
        // .click()


    })

    it('renders button  previous page', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(PaginatorList)
            .get('[data-cy="prev-button"]')
            .should('be.visible')
            .and('be.disabled')
        //   .click()

    })

    it('renders next page', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(PaginatorList)
            .get('[data-cy="next-button"]')
            .should('be.visible')
            //   .and('be.enable')
            .click()

    })

    it('renders last page', () => {

        cy.mount(PaginatorList)
            .get('[data-cy="last-button"]')
            .should('be.visible')
            .click()

    })
})