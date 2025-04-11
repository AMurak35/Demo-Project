Feature: Checkout process
	User can go to checkout and finalize his shopping

@checkout	
Scenario: Succesfully complete the checkout process
	Given the user added following products to the cart:
	| Sauce Labs Backpack         |
    | Sauce Labs Bike Light       |
    | Sauce Labs Bolt T-Shirt     |
	* the user started the checkout process
	* the user filled in his personal information
	* the user clicked on "Continue"
	When he finishes the checkout
	Then he lands on the "Success" page

@checkout
Scenario: Cancel checkout process on the first checkout page
	Given the user added following products to the cart:
	| Sauce Labs Backpack         |
    | Sauce Labs Bolt T-Shirt     |
	And the user started the checkout process 
	And the user is on the page "Checkout: Your Information"
	When he cancels checkout
	Then he lands on the "Cart" page

@checkout	
Scenario: Cancel checkout process on the overview page
	Given the user added following products to the cart:
    | Sauce Labs Bike Light       |
	| Sauce Labs Fleece Jacket    |
    | Sauce Labs Bolt T-Shirt     |
	| Sauce Labs Onesie		 	  |
	And the user started the checkout process 
	And the user is on the page "Checkout: Overview"
	When he cancels checkout
	Then he lands on the "Inventory" page
	