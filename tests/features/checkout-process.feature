@checkout
Feature: Checkout process
	User can go to checkout and finalize his shopping

Scenario: Succesfully complete the checkout process
	Given the user adds the product "Sauce Labs Fleece Jacket" to the cart
    When the user goes to the cart page
    And the user starts the checkout process
    And the user enters the checkout data "Monika", "Test", "12345"
    And the user continues the checkout
    And the user is on the page "Checkout: Overview"
	When the user "finishes" the checkout
	Then he lands on the "Success" page
	
Scenario: Cancel checkout process on the overview page
	Given the user adds the product "Sauce Labs Fleece Jacket" to the cart
    When the user goes to the cart page
    And the user starts the checkout process
    And the user enters the checkout data "Monika", "Test", "12345"
    And the user continues the checkout
	And the user is on the page "Checkout: Overview"
	When the user "cancels" the checkout
	Then he lands on the "Inventory" page
	