Feature: Login

@smoke @regression
  Scenario: Successful login with valid credentials
    Given I open the login page
    When I log in with "standard_user" and "secret_sauce" 
    Then I land on the inventory page and see at least one product

@regression
  Scenario: Try to login with locked out user
    Given I open the login page
    When I log in with "locked_out_user" and "secret_sauce"
    Then I should see the error message "Sorry, this user has been locked out."