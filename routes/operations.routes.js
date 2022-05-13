var router = require("express").Router();
const {auth} = require ('../middlewares/auth');
const { createBankAccount, getFinalBalances} = require('../controllers/account.controller');

router
.route('/create-account')
.post([auth],createBankAccount);

router.route('/get-balances')
.get(getFinalBalances)
module.exports = router;