UI (Playwright + Cucumber)
------------------------
1. **Smoke tests on PR:**
Cover login and checkout flow scenarios, which are the core happy paths. These are critical paths that must work on every pull request.

2. **Regression tests nightly**
Expand smoke test suite to include alternative and negative scenarios including other UI validations (e.g. cart behavior, input validation, error messages). Run all feature-based tests using Cucumber tags (@regression) every night.

3. **Flaky tests**
Includes only tests tagged as @flaky, scenarios that tend to have instable and aconsistent results and tend to provoke false positives. They are configured to be re-executed using retries to have more consistent results.
---------------------

API (Postman + Newman)
---------------------
1. **Contract & functional tests on PR:**
Validate endpoint structure, status codes, and required fields. Already handled in your Newman collection with both happy path and negative tests.

2. **Data-driven regression nightly**
Extend your tests to use data files (e.g. CSV or random values). Run with different inputs via Newman in CI pipelines for broader coverage. In this solution, random but valid values are selected for each request.
---------------------

Non-functional (JMeter)
---------------------
1. **Performance smoke tests pre-release:**
Use JMeter to simulate 20+ users, 1–2 min ramp-up, 3–5 min steady load on /booking endpoint (POST method, happy path scenario). Randomized payloads help mimic real user behavior and uncover performance degradation. Monitor latency, error %, and timeouts to validate system readiness.
---------------------

CI/CD Integration — GitHub Actions
---------------------
This project includes a GitHub Actions workflow (.github/workflows/qa.yml) that runs automated tests as part of the CI pipeline. The pipeline is structured as follows:

1. **Workflow Structure**
- Job 1 – api-tests (Newman)
    * Executes the Postman collection using Newman.
    * Uses the restful_booker environment.
    * Validates both positive and negative booking scenarios.
    * Generates a JUnit report for easy integration with CI dashboards.

- Job 2 – ui-tests (Playwright + Cucumber)
    * Runs the Playwright framework in headless mode.
    * Supports retries (e.g., --retry 2) and can be configured for parallel execution.
    * Tagged test filtering enabled (@smoke, @regression, @flaky).
    * Suitable for running on every PR (smoke) and nightly builds (regression).

- Artifacts Stored
    * HTML reports
    * JSON reports (Cucumber)
    * Screenshots on failure
    * Videos (Playwright)
    * Traces (trace.zip) for interactive debugging

Artifacts are uploaded per job and can be downloaded directly from the GitHub Actions run page.

2. **Merge Gating & Flaky Tests**
- Required Checks for Merges
    * Enable branch protection rules in GitHub:
        * Require both api-tests and ui-tests to pass before allowing merge into main.
        * Require one approving review and updated branches before merge.

- Handling Flaky Tests
    * Tag flaky scenarios with @flaky.
    * Exclude @flaky from required checks.
    * Run flaky tests in a separate, optional job or via npm run test:flaky.

This prevents unstable tests from blocking merges, while still surfacing their results for triage.
---------------------