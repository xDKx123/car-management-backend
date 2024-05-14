import User, { IUser } from "../../models/user";

class UserQuery {
  static async getUserById(id: string) {
    return await User.findById(id);
  }

  static async getUserByEmail(email: string) {
    return await User.findOne({ email: email });
  }

  static async getUserByUsername(username: string) {
    return await User.findOne({ username: username });
   }

  static async addUser(user: Partial<IUser>) {
    return await new User(user).save();
  }

  static async removeUser(id: string) { 
    return await User.findByIdAndDelete(id);
  }
}

export default UserQuery;