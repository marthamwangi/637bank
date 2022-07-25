import userModel from "../schema";

export const model = {
    create(user: any) {
        return userModel.create(user);
    },
    get(query: any) {
        return userModel.find(query);
    }
}
