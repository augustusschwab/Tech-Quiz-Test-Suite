import React from 'react';
import Quiz from '../../client/src/components/Quiz';

describe('<Quiz />', () => {
    it('should render the quiz component', () => {
        cy.mount(<Quiz />)
    });

    it('should render the quiz start button', () => {
        cy.mount(<Quiz />)
        cy.get('button').should('have.text', 'Start Quiz')
    })

    it('starts the quiz and displays "loading...", when "Start Quiz" button is clicked', () => {
        cy.mount(<Quiz />)
        cy.contains('Start Quiz').click()
        cy.contains('Loading...')
    })

    it('fetches and displays a question and 4 selectable answers, after loading', () => {
        cy.intercept('GET','/api/questions/random', {
            fixture: 'questions.json'
        }).as('fetchQuestion')

        cy.mount(<Quiz />)
        cy.contains('Start Quiz').click()

        cy.wait('@fetchQuestion').its('response.statusCode').should('eq', 200);

        cy.get('h2').should('have.text', 'What is the output of print(2 ** 3)?')
        cy.get('.d-flex').should('have.length', 4)
        cy.get('.d-flex').first().within(() => {
            cy.get('button').should('have.text', '1')
            cy.get('.alert').should('have.text', '6')
        })
        cy.get('.d-flex').eq(1).within(() => {
            cy.get('button').should('have.text', '2')
            cy.get('.alert').should('have.text', '8')
        })
        cy.get('.d-flex').eq(2).within(() => {
            cy.get('button').should('have.text', '3')
            cy.get('.alert').should('have.text', '9')
        })
        cy.get('.d-flex').eq(3).within(() => {
            cy.get('button').should('have.text', '4')
            cy.get('.alert').should('have.text', '12')
        })
    })

    it('verifies the correctness of the answer', () => {
        cy.intercept('GET','/api/questions/random', {
            fixture: 'questions.json'
        }).as('fetchQuestion')

        cy.mount(<Quiz />)
        cy.contains('Start Quiz').click()

        cy.wait('@fetchQuestion')

        cy.get('.d-flex').eq(1).within(() => {
            cy.get('button').click()
        })

        cy.get('h2').should('have.text', 'Quiz Completed')
        cy.get('.alert').should('have.text', 'Your score: 1/1')
        cy.get('button').should('have.text', 'Take New Quiz')
    })

    it('starts the quiz again when "Take New Quiz" is selected', () => {
        cy.intercept('GET','/api/questions/random', {
            fixture: 'questions.json'
        }).as('fetchQuestion')

        cy.mount(<Quiz />)
        cy.contains('Start Quiz').click()

        cy.wait('@fetchQuestion')

        cy.get('.d-flex').eq(1).within(() => {
            cy.get('button').click()
        })
        cy.contains('Take New Quiz').click()
        cy.wait('@fetchQuestion').its('response.statusCode').should('eq', 200);
    })
});