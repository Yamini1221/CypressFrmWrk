import HomePage from '../PageObjects/HomePage'
import DetailsPage from '../PageObjects/DetailsPage'

describe('Validate the prestashop.ryviushop.com Website', () => {
  before(function(){
      cy.fixture('TestData').then(function(data){
        this.data = data
      })
  })

  beforeEach(() => {
    cy.visit('/');
  })

  it('Add the item to the Cart', () => {

      const homePg = new HomePage()
      const detailsPg = new DetailsPage()
      
      homePg.getPopularProducts().should('be.visible')

      //Validation of default products on home page
      homePg.getTotalProducts().should('have.length', 7)

      //Searching product
      homePg.getSearch().type(this.data.item)
      homePg.getSubmit().click()

      const productName = homePg.getProductName().text()      
      //navigating to product details page
      if(productName.contains(this.data.item)){
        homePg.navigateProdDetails().click({force: true})
      }

      //Validation of short description
      detailsPg.getShortDesc().contains(this.data.shortDescription).should('be.visible')

      //Adding item to cart
      detailsPg.getAddToCart().click({force:true})

      //validaiton of item added to cart
      detailsPg.getAddedMsg().contains(this.data.ItemToCartMessage).should('be.visible')

  })

})
