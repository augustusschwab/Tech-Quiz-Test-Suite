import React from 'react';
import Quiz from '../../client/src/components/Quiz';

describe('<Quiz />', () => {
    it('should render the quiz component', () => {
        cy.mount(<Quiz />)
    });

    it('should render the quiz start button', () => {
        cy.mount(<Quiz />)
        cy.get('[data-cy="start-button"').should('have.text', 'Start Quiz')
    })

    it('starts the quiz and displays "loading...", when "Start Quiz" button is clicked', () => {
        cy.mount(<Quiz />)
        cy.contains('Start Quiz').click()
        cy.get('[data-cy="load-screen"]').should('have.text', 'Loading...')
    })

    it('fetches and displays a question and 4 selectable answers, after loading', () => {
        cy.intercept('GET','/api/questions/random', {
            fixture: 'questions.json'
        }).as('fetchQuestion')

        cy.mount(<Quiz />)
        cy.contains('Start Quiz').click()

        cy.wait('@fetchQuestion').its('response.statusCode').should('eq', 200);

        cy.get('h2').should('have.text', 'What is the output of print(2 ** 3)?')
        cy.get('[data-cy="answers"]').should('have.length', 4)
        cy.get('[data-cy="answers"]').first().within(() => {
            cy.get('[data-cy="answer-selector"]').should('have.text', '1')
            cy.get('[data-cy="answer"]').should('have.text', '6')
        })
        cy.get('[data-cy="answers"]').eq(1).within(() => {
            cy.get('[data-cy="answer-selector"]').should('have.text', '2')
            cy.get('[data-cy="answer"]').should('have.text', '8')
        })
        cy.get('.d-flex').eq(2).within(() => {
            cy.get('[data-cy="answer-selector"]').should('have.text', '3')
            cy.get('[data-cy="answer"]').should('have.text', '9')
        })
        cy.get('.d-flex').eq(3).within(() => {
            cy.get('[data-cy="answer-selector"]').should('have.text', '4')
            cy.get('[data-cy="answer"]').should('have.text', '12')
        })
    })

    it('shows another question when an answer is selected', () => {
        cy.intercept('GET','/api/questions/random', {
            fixture: 'questions.json'
        }).as('fetchQuestion')

        cy.mount(<Quiz />)
        cy.contains('Start Quiz').click()

        cy.wait('@fetchQuestion')

        cy.get('[data-cy="answers"]').eq(1).within(() => {
            cy.get('[data-cy="answer-selector"]').click()
        })

        cy.get('h2').should('have.text', 'Which of the following is a mutable data type in Python?')
        cy.get('[data-cy="answers"]').eq(3).within(() => {
            cy.get('[data-cy="answer-selector"]').click()
        })
    })

    it('shows the score when the final question is answered', () => {
        cy.intercept('GET','/api/questions/random', {
            fixture: 'questions.json'
        }).as('fetchQuestion')

        cy.mount(<Quiz />)
        cy.contains('Start Quiz').click()

        cy.wait('@fetchQuestion')

        cy.get('[data-cy="answers"]').eq(1).within(() => {
            cy.get('[data-cy="answer-selector"]').click()
        })
        cy.get('[data-cy="answers"]').eq(3).within(() => {
            cy.get('[data-cy="answer-selector"]').click()
        })
        
        cy.get('h2').should('have.text', 'Quiz Completed')
        cy.get('[data-cy="score"]').should('have.text', 'Your score: 1/2')
    })

    it('starts the quiz again when "Take New Quiz" is selected', () => {
        cy.intercept('GET','/api/questions/random', {
            fixture: 'questions.json'
        }).as('fetchQuestion')

        cy.mount(<Quiz />)
        cy.contains('Start Quiz').click()

        cy.wait('@fetchQuestion')

        cy.get('[data-cy="answers"]').eq(1).within(() => {
            cy.get('[data-cy="answer-selector"]').click()
        })
        cy.get('[data-cy="answers"]').eq(3).within(() => {
            cy.get('[data-cy="answer-selector"]').click()
        })

        cy.contains('Take New Quiz').click()
        cy.wait('@fetchQuestion').its('response.statusCode').should('eq', 200);
    })
});