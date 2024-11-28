class WikipediaHomePage {
  visitHomePage() {
    cy.visit('https://www.wikipedia.org/');
  }

  getSearchBar() {
    return cy.get('#searchInput');
  }

  getSearchButton() {
    return cy.get('button[type="submit"]');
  }

  getLanguageDropdown(value) {
    return cy.get('#searchLanguage').select(value).invoke('val').should('eq',value);
  }

  getFooterLinks() {
    return cy.get('nav[aria-label="Other projects"]>div>a');
  }

  getLogo() {
    return cy.get('a#p-logo img');
  }

  getLogoLink() {
    return cy.get('a#p-logo');
  }
  citeLicence(){
    return cy.get('.site-license');
  }

  verifyMobileView() {
    cy.viewport('iphone-6');
  }
  footer(){
    return cy.get('.footer'); 
  }

  performSearch(query) {
    this.getSearchBar().type(query);
    this.getSearchButton().click();
  }
}

export default new  WikipediaHomePage();
