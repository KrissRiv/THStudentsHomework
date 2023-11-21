import App from '../App'
import { mount } from '@cypress/react18'

describe('<App>', () => {
  it('mounts', () => {
    mount(<App />)
    cy.get('h1').should('have.text', 'TH Students Homework')
  })
})
