Feature: Checkout Flow

@regression @smoke
  Scenario: Successful checkout flow
    Given I am logged in as a "standard user"
    When I add any product to the cart
    And I fill First Name, Last Name, Postal Code with any valid values
    And I complete the checkout
    Then I see "Thank you for your order!" confirmation

@regression
  Scenario: Form validation shows error when Postal Code is missing
    Given I am at the checkout information page
    When I leave the Postal Code field empty and click Continue
    Then I see an error message about the missing field