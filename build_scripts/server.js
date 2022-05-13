const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {auth} = require ('../middlewares/auth')
const { registerUser,
  loginUser } = require('../controllers/authController');
const { createBankAccount,depositAmount,transferAmount,withdrawAmount, getFinalBalances} = require('../controllers/accountController');
const PORT = 3000;
const app = express();

const dbURI = "mongodb+srv://marthamwangi:cnu347chcd@637-bank-cluster.4jxrt.mongodb.net/637-bank-database?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result => app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  })))
  .catch((err) => console.log(err))


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send('637 Bank')
});
app.post('/register', registerUser);
app.post('/login', loginUser);
app.post('/create-account',[auth], createBankAccount);
app.post('/:accountId/deposit',[auth],depositAmount);
app.post('/:accountId/transfer',[auth],transferAmount);
app.post('/:accountId/withdraw',[auth],withdrawAmount);
app.get('/balances', getFinalBalances)