
import FilterSearch from '@/components/FilterSearch'
/// <reference types="cypress" />
describe('<FilterSearch  />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(FilterSearch )
  })

  it('renders filter name', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(FilterSearch)
      .get('[data-cy="label-name"]')
      .should('contain.text' , 'Name')
      .get('#name').type('Rick')

  })

  it('renders filter status', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(FilterSearch)
      .get('[data-cy="label-status"]')
      .should('contain.text' , 'Status')
      .get('#status').select('alive')
      .get('#status').select('dead')
      .get('#status').select('unknow')

  })

  it('renders button search', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(FilterSearch)
    .get('[data-cy="button-search"]')
      .should('contain.text' , 'Search')
      .should('be.visible')
      .and('be.enable')
      .click()

  })
})