Feature: Checkout Flow

@regression @smoke
  Scenario: Successful checkout flow
    Given I am logged in as a "standard user"
    When I add any product to the cart
    And I fill First Name, Last Name, Postal Code with any valid values
    And I complete the checkout
    Then I see the "Thank you for your order!" confirmation

@flaky
  Scenario: Form validation shows error when required field is missing
    Given I am at "Checkout: Your Information"
    When I leave the "Postal Code" empty and click "Continue"
    Then I see the error message about the missing field