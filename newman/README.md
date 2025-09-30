README — API Testing with Postman and Newman
=============================================

Overview
-----------
This project contains a Postman collection and environment to test the public API:
**https://restful-booker.herokuapp.com**

Files included:
- `RestfulBooker.postman_collection` → the collection with all test cases
- `restful_booker.postman_environment.json` → environment with base URL

Prerequisites
---------------
1. Install [Postman](https://www.postman.com/downloads/) (optional for local editing/running)
2. Install [Node.js](https://nodejs.org/) (v16+ recommended)
3. Install Newman CLI:
   ```bash
   npm install -g newman
   ```

Run API Tests via Newman
---------------------------
Run the collection with environment variables:

```bash
newman run RestfulBooker.postman_collection -e restful_booker.postman_environment.json
```

Options for Reporting
------------------------
1. CLI only:
   ```bash
   newman run RestfulBooker.postman_collection -e restful_booker.postman_environment.json
   ```

2. With HTML Report (requires Newman Reporter HTML):
   ```bash
   npm install -g newman-reporter-html
   newman run RestfulBooker.postman_collection -e restful_booker.postman_environment.json -r html
   ```

3. With JUnit report (for CI integration):
   ```bash
   newman run RestfulBooker.postman_collection -e restful_booker.postman_environment.json -r junit --reporter-junit-export results/report.xml
   ```

Test Cases
------------------------
1. **Successful Booking Creation**
   - POST to `/booking` with a valid payload
   - Expects 200 status
   - Asserts presence of `bookingid` and `booking` object in response

2. **Negative Booking Creation**
   - POST to `/booking` with missing required fields (e.g. missing `firstname`)
   - Expects non-2xx status
   - Asserts error or mismatch from happy-path response

Pre-request & Test Scripts
------------------------
*Pre-request Script (Collection-Level)*
A collection-level pre-request script dynamically generates randomized values for fields like firstname, lastname, additionalneeds, and postalcode, as well as valid checkin and checkout dates.
These variables are injected into the request body to simulate realistic and unique booking payloads on each run.

*Test Script (Assertions Per Request)*
Postman test scripts are included to validate:
   - The HTTP status code (e.g., expect 200 for successful bookings)
   - The presence of expected keys like bookingid and booking in the response

Negative tests assert that the API correctly returns non-2xx responses and handles error scenarios appropriately.

Environment Setup
---------------------
Environment variables used:
```json
{
  "base_url": "https://restful-booker.herokuapp.com"
}
```

Change the value of `base_url` in Postman environment if pointing to another server.