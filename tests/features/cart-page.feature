Feature: Managing products in the cart

@cart
Scenario: Add and remove products and check cart contents
    Given the user is on the cart page
    When the user goes to the inventory page
    And the user adds "Sauce Labs Onesie" to the cart
    And the user adds "Sauce Labs Fleece Jacket" to the cart
    And the user adds "Sauce Labs Bolt T-Shirt" to the cart
    And the user goes to the cart page
    Then the cart should contain "3" items

    When the user clicks the continue shopping button
    And the user removes "Sauce Labs Onesie" from the inventory page
    And the user goes to the cart page
    Then the cart should contain "2" items

    When the user clicks the continue shopping button
    And the user removes "Sauce Labs Fleece Jacket" from the inventory page
    And the user removes "Sauce Labs Bolt T-Shirt" from the inventory page
    And the user goes to the cart page
    Then the cart should contain "0" items