@e2e @checkout
Feature: End-to-End Checkout Process
  A user can log in, add/remove products, and successfully complete a checkout

  Scenario: Successfully log in, manage cart, and finish checkout
    Given the user is on the login page
    And the user entered "standard_user" and "secret_sauce"
    When he clicks on the login button
    Then he sees "Inventory page"

    When the user "adds" "Sauce Labs Fleece Jacket"
    And the user "adds" "Sauce Labs Bike Light"
    And the user opens the product page for "Sauce Labs Onesie"
    And the user "adds" the product
    And the user navigates back to the inventory page
    And the user "removes" "Sauce Labs Bike Light"
    And the user goes to the cart page
    Then the cart should contain "2" items

    When the user starts the checkout process
    And the user enters the checkout data "Monika", "Test", "12345"
    And the user continues the checkout
    And the user is on the page "Checkout: Overview"
    When the user "finishes" the checkout
    Then he lands on the "Success" page