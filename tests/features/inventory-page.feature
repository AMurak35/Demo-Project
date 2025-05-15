@cart
Feature: Adding to and removing products from cart
	User can add products to cart and remove them from it

Scenario: Adding to and removing products from cart on the inventory page
	Given the user is on the inventory page
  	When the user "adds" "Sauce Labs Bolt T-Shirt"
  	And the user "adds" "Sauce Labs Onesie"
  	And the user "removes" "Sauce Labs Onesie"
  	And the user "adds" "Sauce Labs Bike Light"
  	And the user "removes" "Sauce Labs Bike Light"
  	And the user "adds" "Sauce Labs Onesie"
	Then the cart should display "2"
  	And the cart should contain the following products:
    | Sauce Labs Bolt T-Shirt |
    | Sauce Labs Onesie       |