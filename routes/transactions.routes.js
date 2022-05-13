var router = require("express").Router();
const {auth} = require ('../middlewares/auth');
const {depositAmount,transferAmount,withdrawAmount} = require('../controllers/account.controller');
router
.route('/:accountId/deposit')
.post([auth],depositAmount)

router
.route('/:accountId/transfer')
.post([auth], transferAmount)

router
.route('/:accountId/withdraw')
.post([auth],withdrawAmount)

module.exports = router;