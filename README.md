# P2P-Loan-System

Peer-to-Peer Lending Platform
Introduction
The Peer-to-Peer (P2P) Lending Platform is a system that enables users to borrow and lend money directly to each other. The platform utilizes MongoDB to store loan agreements, repayment schedules, and user credit ratings. Key features include loan applications, automated interest calculations, and loan tracking.

## Features

- User Management: Create and manage users with details like name, email, phone, credit rating, and account balance.
- Loan Management: Users can create loans, choose lenders, and track the status of loans.
- Repayments: Track loan repayments including payment amount, method, status, and penalties.
- Loan Agreements: Generate loan agreements, including terms, signature, and contract status.
- Credit Ratings: Store and manage credit ratings for each user.
- Interest Calculations: Calculate interest on loans using either simple or compound interest.

## Setup

### Prerequisites

- Node.js (version 14 or later)
- MongoDB (either locally or via a service like MongoDB Atlas)

Automated Interest Calculations: The system automatically calculates interest rates based on user credit ratings and loan terms.

Loan Tracking: Users can track the status of their loans, including repayment schedules and remaining balances.

User Credit Ratings: The platform maintains user credit ratings based on their repayment history.

### API Endpoints

- User Management
  - GET /users: Fetch all users.
  - POST /users: Add a new user.
  
- Loan Management
  - GET /loans: Fetch all loans.
  - POST /loans: Add a new loan.

- Repayment Management
  - GET /repayments: Fetch all repayments.
  - POST /repayments: Add a new repayment.

- Loan Agreements
  - GET /agreements: Fetch all loan agreements.
  - POST /agreements: Add a new loan agreement.

- Credit Ratings
  - GET /ratings: Fetch all credit ratings.
  - POST /ratings: Add a new credit rating.

- Interest Calculations
  - GET /calculations: Fetch all interest calculations.
  - POST /calculations: Add a new interest calculation.

  ### Database Models

- User: Contains user information like name, email, phone, address, account balance, and status.
- Loan: Represents loans taken by users, including loan amount, interest rate, status, and terms.
- Repayment: Tracks repayments made against loans, including the amount paid, date, and payment status.
- Loan Agreement: Stores the loan agreement details such as terms, agreement date, and signatures.
- Credit Rating: Represents a user's credit rating score.
- Interest Calculation: Holds data related to loan interest calculations (simple or compound).

