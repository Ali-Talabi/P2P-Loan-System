// Setting up MongoDB schemas with Mongoose for the P2P Lending system
const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
    user_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    address: { type: String },
    credit_rating: { type: mongoose.Schema.Types.ObjectId, ref: 'CreditRating' },
    status: { type: String, enum: ['Active', 'Inactive', 'Blocked'], default: 'Active' },
    account_balance: { type: Number, default: 0 },
    signup_date: { type: Date, default: Date.now },
    last_login: { type: Date },
    transaction_history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }]
});

// Loan Schema
const loanSchema = new mongoose.Schema({
    loan_id: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    interest_rate: { type: Number, required: true },
    term: { type: Number, required: true }, // in months
    status: { type: String, enum: ['Active', 'Settled', 'Overdue'], default: 'Active' },
    borrower_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    disbursement_date: { type: Date },
    repayment_date: { type: Date },
    loan_type: { type: String, enum: ['Personal', 'Business'], default: 'Personal' },
    collateral: { type: String },
    guarantor: { type: String }
});

// Repayment Schema
const repaymentSchema = new mongoose.Schema({
    repayment_id: { type: String, required: true, unique: true },
    loan_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Loan', required: true },
    amount_paid: { type: Number, required: true },
    payment_date: { type: Date, default: Date.now },
    payment_method: { type: String, enum: ['Credit Card', 'Bank Transfer'], required: true },
    payment_status: { type: String, enum: ['Successful', 'Failed'], default: 'Successful' },
    remaining_balance: { type: Number },
    penalty: { type: Number, default: 0 }
});

// Loan Agreement Schema
const loanAgreementSchema = new mongoose.Schema({
    agreement_id: { type: String, required: true, unique: true },
    loan_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Loan', required: true },
    terms: { type: String, required: true },
    agreement_date: { type: Date, default: Date.now },
    signatures: { type: String },
    contract_status: { type: String, enum: ['Signed', 'Pending'], default: 'Pending' }
});

// Credit Rating Schema
const creditRatingSchema = new mongoose.Schema({
    rating_id: { type: String, required: true, unique: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, min: 300, max: 850, required: true },
    rating_date: { type: Date, default: Date.now },
    remarks: { type: String },
    rating_source: { type: String }
});

// Interest Calculation Schema
const interestCalculationSchema = new mongoose.Schema({
    calculation_id: { type: String, required: true, unique: true },
    loan_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Loan', required: true },
    calculated_interest: { type: Number, required: true },
    total_amount_due: { type: Number, required: true },
    calculation_date: { type: Date, default: Date.now },
    calculation_method: { type: String, enum: ['Simple', 'Compound'], required: true },
    penalty_rate: { type: Number, default: 0 }
});

// Exporting Models
module.exports = {
    User: mongoose.model('User', userSchema),
    Loan: mongoose.model('Loan', loanSchema),
    Repayment: mongoose.model('Repayment', repaymentSchema),
    LoanAgreement: mongoose.model('LoanAgreement', loanAgreementSchema),
    CreditRating: mongoose.model('CreditRating', creditRatingSchema),
    InterestCalculation: mongoose.model('InterestCalculation', interestCalculationSchema)
};

// Example CRUD API Implementation with Express
const express = require('express');
const router = express.Router();

// Fetch all repayments
router.get('/repayments', async (req, res) => {
    try {
        const repayments = await mongoose.model('Repayment').find();
        res.json(repayments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a new repayment
router.post('/repayments', async (req, res) => {
    try {
        const newRepayment = new (mongoose.model('Repayment'))(req.body);
        const savedRepayment = await newRepayment.save();
        res.status(201).json(savedRepayment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch all agreements
router.get('/agreements', async (req, res) => {
    try {
        const agreements = await mongoose.model('LoanAgreement').find();
        res.json(agreements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a new agreement
router.post('/agreements', async (req, res) => {
    try {
        const newAgreement = new (mongoose.model('LoanAgreement'))(req.body);
        const savedAgreement = await newAgreement.save();
        res.status(201).json(savedAgreement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch all credit ratings
router.get('/ratings', async (req, res) => {
    try {
        const ratings = await mongoose.model('CreditRating').find();
        res.json(ratings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a new credit rating
router.post('/ratings', async (req, res) => {
    try {
        const newRating = new (mongoose.model('CreditRating'))(req.body);
        const savedRating = await newRating.save();
        res.status(201).json(savedRating);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch all interest calculations
router.get('/calculations', async (req, res) => {
    try {
        const calculations = await mongoose.model('InterestCalculation').find();
        res.json(calculations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a new interest calculation
router.post('/calculations', async (req, res) => {
    try {
        const newCalculation = new (mongoose.model('InterestCalculation'))(req.body);
        const savedCalculation = await newCalculation.save();
        res.status(201).json(savedCalculation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
