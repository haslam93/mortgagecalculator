const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Get current mortgage rates
app.get('/api/rates', (req, res) => {
  db.all("SELECT * FROM rates", [], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    });
  });
});

// Calculate mortgage payment (Simple formula)
app.post('/api/calculate', (req, res) => {
  const { loanAmount, interestRate, loanTermYears } = req.body;
  
  if (!loanAmount || !interestRate || !loanTermYears) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  const principal = parseFloat(loanAmount);
  const calculatedInterest = parseFloat(interestRate) / 100 / 12;
  const calculatedPayments = parseFloat(loanTermYears) * 12;

  // Monthly payment formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (!isFinite(monthly)) {
     return res.status(400).json({ error: "Invalid calculation" });
  }

  res.json({
    monthlyPayment: monthly.toFixed(2),
    totalPayment: (monthly * calculatedPayments).toFixed(2),
    totalInterest: ((monthly * calculatedPayments) - principal).toFixed(2)
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
