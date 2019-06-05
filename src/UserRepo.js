
class UserRepo {
  constructor(users) {
    this.users = users;
    this.currentUser;
  }

  getCurrentUser(name) {
    let newUser = this.users.find(user => user.name === name)
    this.currentUser = newUser;
  }
}

export default UserRepo;
