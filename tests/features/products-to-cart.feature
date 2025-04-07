@cart
Feature: Adding to and removing products from cart
	User can add products to cart and remove them from it
	
Scenario: Adding products on the product page
	Given the user is on the inventory page
	And the cart contains the following products:
	| Sauce Labs Fleece Jacket |
    | Sauce Labs Bike Light    |
	When the user goes to product "<pageName>"
	And the user "adds" the product
	Then the cart counter should show "3"

Examples: 
	| pageName 			  |
	| Sauce Labs Backpack |
	| Sauce Labs Onesie   |

Scenario: Removing products on the product page
	Given the user is on the inventory page
	And the cart contains the following products:
	| Sauce Labs Fleece Jacket |
    | Sauce Labs Bike Light    |
	When the user goes to product "<pageName>"
	And the user "removes" the product
	Then the cart counter should show "1"

Examples: 
	| pageName 				   |
	| Sauce Labs Fleece Jacket |
    | Sauce Labs Bike Light    |

Scenario: Adding multiple products and checking the cart
    Given the user is on the inventory page
    When the user "adds" the following products:
    | Sauce Labs Backpack         |
    | Sauce Labs Bike Light       |
    | Sauce Labs Bolt T-Shirt     |
    Then the cart should contain the following products:
    | Sauce Labs Backpack         |
    | Sauce Labs Bike Light       |
    | Sauce Labs Bolt T-Shirt     |

Scenario: Removing multiple products and checking the cart
	Given the user is on the inventory page
	And the cart contains the following products:
    | Sauce Labs Fleece Jacket    |
    | Sauce Labs Bolt T-Shirt     |
	| Sauce Labs Onesie		 	  |
    When the user "removes" the following products:
    | Sauce Labs Onesie      	  |
    | Sauce Labs Bolt T-Shirt     |
    Then the cart should contain the following products:
    | Sauce Labs Fleece Jacket    |