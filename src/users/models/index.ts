import userModel from "../schema";

export const model = {
    create(user: any) {
        return userModel.create(user);
    },
    get({ query }) {
        return userModel.find(query);
    }
}
