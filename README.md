# Web Automation Test - DemoQA Web Tables

Automation testing for bulk user registration on the Web Tables page using Cypress and TypeScript with CSV data source.

## Requirements
- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd web-automation-test
```

2. Install dependencies:
```bash
npm install
```

## Running Tests

### Interactive Mode (Cypress UI)
```bash
npm run test
```

### Headless Mode (Command Line)
```bash
npm run test:headless
```

### Headed Mode (Browser Visible)
```bash
npm run test:headed
```

### Run with Specific Browser
```bash
npm run test:chrome
npm run test:firefox
npm run test:edge
```

### Run Specific Test Suite
```bash

# Run only Droppable tests
npx cypress run --spec "cypress/e2e/droppable.cy.ts"

# Run only Positive test Web Tables
npx cypress run --spec "cypress/e2e/positive/*.cy.ts"

# Run only Negative tests Web Tables
npx cypress run --spec "cypress/e2e/negative/*.cy.ts"
```

## Test Cases

### Positive Test Cases (Web Tables)
1. TC-001: Register multiple users from CSV
2. TC-002: Display all registered users in table


### Negative Test Cases (Web Tables)
1. TC-004: Validation error when email is empty
2. TC-005: Validation error when age contains letters


### Bonus Test Cases - Droppable
1. BTC-001: Drag & drop element successfully



## Test Data

The CSV file contains user data with the following columns:
- **firstName:** First name of the user
- **lastName:** Last name of the user
- **email:** Email address in valid format
- **age:** Age (numeric value between 18-65)
- **salary:** Salary (numeric value)
- **department:** Department name (IT, QA, Finance, HR, Operation, etc.)

### CSV File Location
```
cypress/fixtures/users.csv
```

### Sample Data
```csv
firstName,lastName,email,age,salary,department
Andi,Wijaya,andi@test.com,25,5000000,IT
Budi,Santoso,budi@test.com,30,7000000,QA
Citra,Lestari,citra@test.com,27,6000000,Finance
Dani,Pratama,dani@test.com,35,8500000,IT
Eka,Putri,eka@test.com,29,6500000,QA
Fajar,Hidayat,fajar@test.com,31,7500000,Operation
Gita,Mandala,gita@test.com,26,5500000,Finance
Hendra,Kusuma,hendra@test.com,33,7000000,HR
```


## Test Reports

Test reports are generated in the following locations:

### Video Recordings
```
cypress/videos/
```
Contains video recordings of test execution for debugging and documentation.

### Screenshots
```
cypress/screenshots/
```
Screenshots are automatically captured when tests fail.

## Quick Start Guide

### Step 1: Extract and Navigate
```bash
unzip web-automation-test.zip
cd web-automation-test
```

### Step 2: Install Dependencies
```bash
npm install
```
This will install Cypress, TypeScript, and all required dependencies (takes 5-10 minutes).

### Step 3: Run Tests
```bash
# Interactive mode (recommended for first run)
npm run test

# Or headless mode
npm run test:headless
```

### Step 4: View Results
- Tests will run automatically
- View detailed logs in Cypress UI
- Check videos and screenshots for failed tests

### Expected Output
```
✓ TC-001: Register multiple users from CSV (5.2s)
✓ TC-002: Display all registered users in table (4.8s)
✓ TC-003: Validation error when email is empty (2.1s)
✓ TC-004: Validation error when age contains letters (1.9s)
✓ BTC-001: Drag & drop element successfully (2.8s)


```

## Technology Stack

- **Framework:** Cypress 13.6
- **Language:** TypeScript 5.0
- **Testing Pattern:** Page Object Model (POM)
- **Data Format:** CSV with PapaParse
- **Node.js:** v14 or higher
- **npm:** v6 or higher
- **Browsers:** Chrome, Firefox, Edge

## Best Practices Implemented

### 1. Page Object Model (POM)
All page elements and interactions are encapsulated in dedicated page objects:
- `WebTablesPage.ts` - Handles Web Tables functionality
- `DroppablePage.ts` - Handles drag & drop operations



### 2. CSV Data-Driven Testing
Test data is stored in CSV files and read at runtime:
- Easy to add/modify test data
- No need to change test code
- Supports bulk testing with multiple datasets
- `cypress/fixtures/users.csv` contains 8 sample users

### 3. Comprehensive Test Coverage
- **Positive Tests:** Validate happy path scenarios
- **Negative Tests:** Validate error handling and validation
- **Bonus Tests:** Additional features (drag & drop)

### 4. Error Handling
- Cross-origin errors handled gracefully
- Tests continue even when external scripts fail
- `cy.on('uncaught:exception', () => false)` prevents test failures from external script errors


## License

MIT License

## Support

For issues and support:

1. Check the troubleshooting section above
2. Review Cypress documentation: https://docs.cypress.io
3. Check test files for usage examples
4. Review SETUP_GUIDE.md for detailed instructions

## Project Information

- **Version:** 1.0.0
- **Last Updated:** February 2025
- **Supported Browsers:** Chrome, Firefox, Edge
- **Languages:** TypeScript 5.0
- **Framework:** Cypress 13.6

---

