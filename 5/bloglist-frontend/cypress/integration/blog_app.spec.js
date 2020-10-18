const { func } = require("prop-types")

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Cypress User',
      username: 'cypress',
      password: 'cypressuser'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('cypress')
      cy.get('#password').type('cypressuser')
      cy.get('#login-button').click()
      cy.contains('Cypress User is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('cypress')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error').contains('Can\'t log in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'cypress', password: 'cypressuser' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('A note created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('a note created by cypress')
      cy.get('#create-button').click().then(() => cy.get('.error').contains('a new blog A note created by cypress by cypress'))
    })

    describe('and added a node', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'Created By Cypress' , author: 'Cypress', url:'cypress.somthing' } )
      })

      it('A user can like a blog', function() {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.get('.visableBlog').contains('likes 1')
      })

      it('A user can delete his own blog', function() {
        cy.contains('view').click()
        cy.contains('remove').click().then(() => cy.get('.error').contains('Created By Cypress is removed successfully!'))
      })

      it('A user can\'t delete a blog he didnt create', function() {
        cy.contains('view').click()
        cy.contains('logout').click()

        const userfake = {
          name: 'Cypress User Fake',
          username: 'cypressfake',
          password: 'cypressuserfake'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', userfake)
        cy.visit('http://localhost:3000')

        cy.login({ username: 'cypressfake', password: 'cypressuserfake' })
        cy.contains('view').click()
        cy.contains('remove').click().then(() => cy.get('.error').contains('You can\'t remove Created By Cypress!'))
      })
    })

    describe('and several blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'first' , author: 'Cypress', url:'cypress.somthing' } )
        cy.createBlog({ title: 'second' , author: 'Cypress', url:'cypress.somthing' } )
        cy.createBlog({ title: 'third' , author: 'Cypress', url:'cypress.somthing' } )
      })

      it('blogs are ordered according to likes', function() {
        cy.contains('second')
          .contains('view').click()
        cy.contains('second')
          .contains('like').click().click().click()
        cy.contains('second')
          .contains('hide').click()

        cy.contains('first')
          .contains('view').click()
        cy.contains('first')
          .contains('like').click().click()
        cy.contains('first')
          .contains('hide').click()

        cy.get('html').find('.hiddenBlog').then((blogs) => {
          cy.wrap(blogs[0]).contains('view').click().then(() => cy.wrap(blogs[0]).contains('likes 3'))
          cy.wrap(blogs[1]).contains('view').click().then(() => cy.wrap(blogs[1]).contains('likes 2'))
          cy.wrap(blogs[2]).contains('view').click().then(() => cy.wrap(blogs[2]).contains('likes 0'))
        })
      })
    })

  })
})