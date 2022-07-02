import transactionModel from "../schema";
export const model = {
    create(transaction: any) {
        return transactionModel.find(transaction);
    },
    get({ query }) {
        return transactionModel.find(query);
    }
}