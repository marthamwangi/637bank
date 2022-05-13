The Challenge
Your task is to simulate bank account balances for three individuals: Wanjiru, Juma, and Linda. You will be provided with starting balances and a list of transactions to perform (outlined below).
There are three types of transactions to simulate:
Deposit: Increment a given individual's account balance by a given amount
Withdrawal: Verify that the account holder has sufficient funds to make the withdrawal. If there are sufficient funds, decrease the account balance by the given number. If funds are not sufficient, make no change to the account balance.
Transfer: Verify that the account holder has sufficient funds to make the transfer. If there are sufficient funds, decrease the sender's account balance by the given number and increase the receiver’s account balance by that same number. If funds are not sufficient, make no change to any account balances.
Input transactions shall be provided as a text file where each line represents a single transaction, ordered chronologically (see attached).
All three individuals begin with a starting balance of zero.
Example transactions:
DEPOSIT: Wanjiru:150.00 (Deposit 150.00 into Wanjiru's account)
WITHDRAW: Juma:1648.26 (Withdraw 1648.26 from Juma's account)
TRANSFER: Wanjiru:Linda:500.00 (Transfer 500.00 from Wanjiru's account to Linda's account)

Deliverables:
[
    {
        "ACCOUNT": "Juma",
        "BALANCE": 4670.51
    },
    {
        "ACCOUNT": "Linda",
        "BALANCE": 1292
    },
    {
        "ACCOUNT": "Wanjiru",
        "BALANCE": 599.5
    }
]