

class UserRepo {
  constructor(users) {
    this.users = users;
    this.currentUser;
  }

  getCurrentUser(name) {
    let newUser = this.users.find(user => user.name === name)
    console.log('New User ', newUser)
    this.currentUser = newUser;
  }

}


export default UserRepo;
