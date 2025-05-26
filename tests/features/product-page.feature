Feature: Manage products on the product item page
  User can add and remove products directly from a product detail page

  @cart
  Scenario: Add and remove products to/from cart on product item page
    Given the user is on the inventory page
    When the user opens the product page for "Sauce Labs Backpack"
    And the user "adds" the product
    And the user "removes" the product
    And the user navigates back to the inventory page
    And the user opens the product page for "Sauce Labs Fleece Jacket"
    And the user "adds" the product
    And the user navigates back to the inventory page
    And the user opens the product page for "Sauce Labs Bolt T-Shirt"
    And the user "adds" the product
    Then the cart should contain the following products: 
    | Sauce Labs Fleece Jacket |
    | Sauce Labs Bolt T-Shirt |