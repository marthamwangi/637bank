import transactionModel from "../schema";
export const model = {
    create(transaction: any) {
        return transactionModel.find(transaction);
    },
    get({ query }: any) {
        return transactionModel.find(query);
    }
}