const express = require('express');
const { User, Loan, Repayment, LoanAgreement, CreditRating, InterestCalculation } = require('../models/models');

const router = express.Router();

// Example: Fetch all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add more CRUD routes as needed
module.exports = router;
