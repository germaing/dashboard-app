Feature: Error scenarios

    @nonmutating
    Scenario: There are no dashboards
        Given I open an app with no dashboards
        Then a message displays informing that there are no dashboards

    @nonmutating
    Scenario: I navigate to a dashboard that doesn't exist or I don't have access to
        Given I type an invalid dashboard id in the browser url
        Then a message displays informing that the dashboard is not found

    @nonmutating
    Scenario: An error occurs while saving a dashboard that I don't have access to
        Given I open the "Delivery" dashboard
        When I choose to edit dashboard
        And I save dashboard that I don't have access to save
        Then I remain in edit mode and error message is displayed

    @nonmutating
    Scenario: A 500 error is thrown when I save the dashboard
        Given I open the "Delivery" dashboard
        When I choose to edit dashboard
        And A 500 error is thrown when I save the dashboard
        Then I remain in edit mode and error message is displayed

    @nonmutating
    Scenario: I enter edit mode of a dashboard I do not have access to edit
        Given I open a non-editable dashboard in edit mode
        Then only the option to return to view mode is available


