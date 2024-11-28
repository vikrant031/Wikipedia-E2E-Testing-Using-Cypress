import wikipedia from "../wikipediaObjects/wikipedia";

describe('Wikipedia Homepage Testing (POM Framework)', () => {
    it('Verify the search bar displays correct results for a valid query', () => {
        wikipedia.visitHomePage();
        wikipedia.performSearch('Python');
        cy.url().should('include', '/wiki/Python');
        cy.get('.mw-page-title-main').should('be.visible').and('have.text','Python')
    });

    it('Verify the search bar handles invalid input gracefully', () => {
        wikipedia.visitHomePage();
        wikipedia.performSearch('@#$%^&*');
        cy.contains('At sign').should('be.visible');
        cy.url().should('include', '/wiki/At_sign');
    });
    it('Verify the search bar redirects to a valid article when a known term is searched', () => {
        wikipedia.visitHomePage();
        wikipedia.performSearch('Software Engineering');
        cy.url().should('include', '/wiki/Software_engineering');
    });
    it('TC04: Verify the language dropdown displays all supported languages', () => {
        wikipedia.visitHomePage();
        wikipedia.getLanguageDropdown('hi');
        wikipedia.performSearch('Virat Kohli');
        cy.get(':nth-child(1) > .searchResultImage > .searchResultImage-text > .mw-search-result-heading > a').click();
        cy.get('.mw-page-title-main').should('be.visible').and('have.text','विराट कोहली');
    });
    it('TC05: Verify the homepage content changes when a language is selected', () => {
        wikipedia.visitHomePage();
        wikipedia.getLanguageDropdown('fr');
        wikipedia.performSearch('Acer');
        cy.url().should('include', '/fr');
    });
    it('TC06: Verify language selection persists after page refresh', () => {
        wikipedia.visitHomePage();
        wikipedia.getLanguageDropdown('fi')
        cy.reload();
        cy.get('#searchLanguage').should('have.value','fi');
      });
      it('TC07: Verify all footer links are clickable and functional', () => {
        wikipedia.visitHomePage();
        wikipedia.getFooterLinks().each(($el) => {
          const href = $el.prop('href');
          expect(href).to.exist;
          cy.request(href).then((response) => {
            expect(response.status).to.eq(200);
          });
        });
      });
      it('TC08: Verify the Download wikipedia for android and ios link redirects to the correct page', () => {
        wikipedia.visitHomePage();
        cy.get('strong.jsl10n > .jsl10n').click();
        cy.wait(1000);
    });
    it('TC09: Verify Donate footer link redirects correctly', () => {
        wikipedia.visitHomePage();
        wikipedia.footer().contains('donation').click();
      });
      it('TC08: Verify the "Privacy Policy" footer link redirects to the correct page', () => {
        wikipedia.visitHomePage();
        wikipedia.footer().should('be.visible');
        cy.wait(1000);
        wikipedia.footer().contains('Privacy Policy').click();
        cy.origin('https://foundation.wikimedia.org', () => {
            cy.get('#firstHeading').should('have.text', 'Wikimedia Foundation Privacy Policy');
        });
      });
      it.only('TC09: Verify "About Wikipedia" footer link redirects correctly', () => {
        wikipedia.visitHomePage();
        wikipedia.footer().should('be.visible');
        cy.wait(1000);
        wikipedia.footer().contains('Terms of Use').click();
        // cy.url().should('include', '/wiki/Wikipedia:About');
        cy.origin('https://foundation.wikimedia.org', () => {
            cy.get('#firstHeading').should('have.text', 'Wikimedia Foundation Terms of Use');
        });
      })

    
      
});