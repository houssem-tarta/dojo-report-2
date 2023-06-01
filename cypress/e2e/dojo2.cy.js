import { faker } from '@faker-js/faker';
const name = faker.name.firstName();
const password = faker.internet.password()

describe('site',()=>{

    it('inscrire', ()=>{

        cy.visit("https://www.demoblaze.com/index.html")
        cy.get('#signin2').click ().should('be.visible')
        cy.get('#sign-username').type(name,{force: true}).should('have.value', name)
        cy.wait(500)
        cy.get('#sign-password').type(password,{force: true}).should('have.value', password)
        cy.get('[onclick="register()"]').click().should('be.enabled');
        cy.intercept('POST','https://api.demoblaze.com/signup',{
            statusCode :200,
        
        })
        cy.login(name,password);
        cy.intercept('POST','https://api.demoblaze.com/login',{
            statusCode :200
        })
        cy.wait(500);
        cy.get(':nth-child(8) > .card > .card-block > .card-title > .hrefch').click({force: true});
        cy.get('.col-sm-12 > .btn').click({force: true});
        cy.get('#cartur').click();
        cy.get('.col-lg-1 > .btn').click();
        cy.get('#name').type(name,{force: true});
        cy.get('#country').type(faker.location.country());
        cy.get('#city').type(faker.location.city());
        cy.get('#card').type(faker.finance.creditCardNumber());
        cy.get('#month').type(faker.date.month());
        cy.get('#year').type('2023');
        cy.wait(500)
        cy.get('#orderModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click();
        cy.screenshot();
    })
    
})