export const createUser = (user: any) => {
    try {
        //hash password
        //create user in database
        //omit passord
        //return user
    } catch (error) {
        //handle user already exists error
    }
}
export const authenticate = ({ username, password }) => {
    //find a user by username
    //throw error if user does not exist
    //if user exists compare password to hash
    // if true omit password and return user
}