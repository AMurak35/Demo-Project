Feature: Loging in
	User can successfully log in with valid data

@login
Scenario: Log in with different user data
	Given the user is on the login page
	And the user entered "<username>" and "<password>"
	When he clicks on the login button
	Then he sees "<result>"

Examples: 
	| username | password | result |
	| standard_user | secret_sauce | Inventory page |
	| locked_out_user | secret_sauce | Locked Out Error |
    | standard_user  | secret   | Wrong Credentials Error |
	
