const Account = require('../models/Account');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const { bankAcountGenerate } = require("../utils/index")
exports.createBankAccount = async function (req, res) {
    const { id } = req.user;
    const { pin } = req.body;
    let user;
    const account = new Account({
        owner: id,
        pin,
        number: await bankAcountGenerate()
    });
    try {
        user = await User.findById(id);
        if (user.account) {
            return res
                .status(400)
                .send({ err: 'You already have a bank account' });
        }
        else {
            await account.save();

        }
        user.account = account.id;
        await user.save();
        res.status(201).json({ account })
    } catch (err) {
        console.log(err.message);
    }

}
exports.depositAmount = async function (req, res) {
    const { id } = req.user; //owner
    const { accountId } = req.params; //acc id
    const { amount, description } = req.body;
    let account;
    try {
        account = await Account.findById(accountId);
        //does the account exist?
        if (!account) {
            return res.status(400).json({ msg: 'Bank Account does not exist!' });
        }
        if (account.owner.toString() !== id) {
            return res.status(401)
                .json({
                    msg: 'Unauthorised'
                })
        }
        //record transaction
        const transaction = new Transaction({
            title: 'DEPOSIT',
            amount,
            account: accountId,
            description,
        });
        await transaction.save();
        //update bal and transactions []
        account.balance += Number(amount);
        account.transactions.push(transaction.id);
        //save account
        await account.save();

        res.status(200).send({ description })

    } catch (error) {
        if (error.message.includes('Cast to ObjectId failed for value')) {
            return res.status(400).json({ err: 'Invalid account ID' });
        }
        return res.status(500).json({ err: 'Server error' });
    }

}
exports.transferAmount = async function (req, res) {
    const { id } = req.user; //from owner
    const { accountId } = req.params;
    const { amount, pin, accountNumber } = req.body;
    let { description } = req.body;
    let account;
    let user;
    let receiverName;
    try {
        account = await Account.findById(accountId);
        user = await User.findById(id);
        //does the account exist?
        if (!account) {
            return res.status(400).json({ msg: 'Bank Account does not exist!' });
        }
        if (account.owner.toString() !== id) {
            return res.status(401)
                .json({
                    msg: 'Unauthorised'
                })
        }
        //set receiver amount
        let receiver;
        receiver = await Account.findOne({ number: accountNumber });
        receiverName = await User.findById(receiver.owner.toString());
        if (!receiver) {
            return res
                .status(401)
                .send({ err: 'User does not exist' })
        }
        //check pin
        if (account.pin !== Number(pin)) {
            return res
                .status(401)
                .send({ err: 'Enter pin again!' })
        }
        //check available blance
        if (account.balance < Number(amount)) {
            description = description + ' failed due to Insufficient funds';
            account.balance += 0;
            const senderTransaction = new Transaction({
                title: 'TRANSFER',
                amount,
                account: accountId,
                description,
            });
            await senderTransaction.save();// from
            //update sender:receiver transaction
            account.transactions.push(senderTransaction.id);
            await account.save();
        } else {
            senderDescription = `You have Transferred Amount: ${amount} to ${receiverName.userName}`;
            receiverDescription = `You have Received Amount: ${amount} from ${user.userName}`;
            account.balance -= Number(amount);
            receiver.balance += Number(amount);
            //record to:from transaction
            const receiverTransaction = new Transaction({
                title: 'TRANSFER',
                amount,
                account: receiver.id,
                description: senderDescription

            });
            const senderTransaction = new Transaction({
                title: 'TRANSFER',
                amount,
                account: accountId,
                description: receiverDescription
            });
            await receiverTransaction.save(); //to
            await senderTransaction.save();// from
            //update sender:receiver transaction
            account.transactions.push(senderTransaction.id);
            receiver.transactions.push(receiverTransaction.id);

            await account.save();
            await receiver.save();
        }
        res.send({ description });
    } catch (error) {
        //handle req.params
        if (error.message.includes('Cast to ObjectId failed for value')) {
            return res.status(400).json({ err: 'Invalid account ID' });
        }
        return res.status(500).json({ err: 'Server error' });
    }

}
exports.withdrawAmount = async function (req, res) {
    const { id } = req.user; //owner
    const { accountId } = req.params;
    const { amount, pin } = req.body;
    let { description } = req.body;

    let account;
    try {
        account = await Account.findById(accountId);
        //does the account exist?
        if (!account) {
            return res.status(400).json({ msg: 'Bank Account does not exist!' });
        }
        if (account.owner.toString() !== id) {
            return res.status(401)
                .json({
                    msg: 'Unauthorised'
                })
        }
        if (account.pin !== Number(pin)) {
            return res
                .status(401)
                .send({ err: 'Enter pin again!' })
        }
        //make withdrawal
        //check available blance
        if (account.balance < Number(amount)) {
            description = `Withdrawal of amount: ${amount} failed due to Insufficient funds`;
            account.balance -= 0;
            const transaction = new Transaction({
                title: 'WITHDRAWAL',
                amount,
                account: accountId,
                description
            });
            //record transaction
            await transaction.save();
            account.transactions.push(transaction.id);
            //save acc changes
            await account.save();
        } else {
            description = `Withdrawal of amount: ${amount} was Successful`;
            account.balance -= Number(amount);
            //record transaction
            const transaction = new Transaction({
                title: 'WITHDRAWAL',
                amount,
                account: accountId,
                description
            });
            //record transaction
            await transaction.save();
            account.transactions.push(transaction.id);
            //save acc changes
            await account.save();
        }


        res.send({ description });


    } catch (error) {
        //handle req.params
        if (error.message.includes('Cast to ObjectId failed for value')) {
            return res.status(400).json({ err: 'Invalid account ID' });
        }
        return res.status(500).json({ err: 'Server error' });
    }
}

exports.getFinalBalances = async function (req, res) {
    let accounts;
    let balances = [];
    let user
    try {
        accounts = await Account.find();
        await Promise.all(accounts.map(async (acc)=>{
            user = await User.findById(acc.owner.toString())
            user = user.userName
            balances.push({ ACCOUNT: user, BALANCE: acc.balance })      
        })
        )
                res.send(balances)//output []
    } catch (error) {
        throw error
    }
}