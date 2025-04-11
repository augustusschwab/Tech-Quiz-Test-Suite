describe('Quiz Full Cycle', () => {
    it('visits the homepage of the quiz', () => {
        cy.visit('http://localhost:3001')
    })

    context('Retrieves a question', () => {
        beforeEach(() => {
            cy.intercept('GET','/api/questions/random', {
                fixture: 'questions.json',
                statusCode: 200
            }).as('fetchQuestion')
        })

        it('Start quiz button is selected and the quiz is started', () => {
            cy.visit('/')
            cy.contains('Start Quiz').click()
            cy.wait('@fetchQuestion').its('response.statusCode').should('eq', 200);
        })

        it('should GET a random question with 4 selectable answers after the start button is clicked', () => {
            cy.visit('/')
            cy.contains('Start Quiz').click()
            cy.wait('@fetchQuestion').its('response.statusCode').should('eq', 200);
            cy.get('[data-cy="answers"]').should('have.length', 4)
        })
    })

    context('Answer is selected', () => {
        beforeEach(() => {
            cy.intercept('GET','/api/questions/random', {
                fixture: 'questions.json',
                statusCode: 200
            }).as('fetchQuestion')
        })

        it('should show another question when an answer is selected', () => {
            cy.visit('/')
            cy.contains('Start Quiz').click()
            cy.wait('@fetchQuestion').its('response.statusCode').should('eq', 200);
            cy.get('[data-cy="answers"]').eq(2).within(() => {
                cy.get('[data-cy="answer-selector"]').click()
            })
        })

        it('should show the quiz complete screen with a 0/2 score for two incorrect answers', () => {
            cy.visit('/')
            cy.contains('Start Quiz').click()
            cy.wait('@fetchQuestion').its('response.statusCode').should('eq', 200);
            cy.get('[data-cy="answers"]').eq(2).within(() => {
                cy.get('[data-cy="answer-selector"]').click()
            })
            cy.get('[data-cy="answers"]').eq(3).within(() => {
                cy.get('[data-cy="answer-selector"]').click()
            })
        })

        it('should show the quiz complete screen with a 1/2 score for 1 correct and 1 incorrect answer', () => {
            cy.visit('/')
            cy.contains('Start Quiz').click()
            cy.wait('@fetchQuestion').its('response.statusCode').should('eq', 200);
            cy.get('[data-cy="answers"]').eq(1).within(() => {
                cy.get('[data-cy="answer-selector"]').click()
            })
            cy.get('[data-cy="answers"]').eq(3).within(() => {
                cy.get('[data-cy="answer-selector"]').click()
            })
        })

        it('should show the quiz complete screen with a 2/2 score for two correct answers', () => {
            cy.visit('/')
            cy.contains('Start Quiz').click()
            cy.wait('@fetchQuestion').its('response.statusCode').should('eq', 200);
            cy.get('[data-cy="answers"]').eq(1).within(() => {
                cy.get('[data-cy="answer-selector"]').click()
            })
            cy.get('[data-cy="answers"]').eq(2).within(() => {
                cy.get('[data-cy="answer-selector"]').click()
            })
        })
    })

    context('Quiz is restarted.', () => {
        beforeEach(() => {
            cy.intercept('GET','/api/questions/random', {
                fixture: 'questions.json',
                statusCode: 200
            }).as('fetchQuestion')
        })

        it('should GET a random question with 4 selectable answers after the start button is clicked', () => {
            cy.visit('/')
            cy.contains('Start Quiz').click()
            cy.wait('@fetchQuestion').its('response.statusCode').should('eq', 200);
            cy.get('[data-cy="answers"]').eq(1).within(() => {
                cy.get('[data-cy="answer-selector"]').click()
            })
            cy.get('[data-cy="answers"]').eq(2).within(() => {
                cy.get('[data-cy="answer-selector"]').click()
            })
            cy.contains('Take New Quiz').click()
        })
    })
})