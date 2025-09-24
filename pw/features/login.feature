Feature: Login

@smoke @regression
  Scenario: Successful login with valid credentials
    Given I open the login page
    When I log in with "standard_user" and "secret_sauce" 
    Then I land on the inventory page and see at least one product