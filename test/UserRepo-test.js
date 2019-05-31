import $ from 'jquery';
import chai from 'chai';
const expect = chai.expect;
import UserRepo from '../src/UserRepo.js'
import users from '../test/DUMMY.js';


let user = {
  "id": 1,
  "name": "Autumn Toy"
};

describe('UserRepo', () => {
  let userRepo;
  
  beforeEach(() => {
    userRepo = new UserRepo(users.users);
  })
  it('should be a function', () => {
    expect(UserRepo).to.be.a('function')
  })

  it('should be a new instance of userRepo', () => {
    expect(userRepo).to.be.a.instanceOf(UserRepo)
  })

  it('should return an array', () => {
    expect(userRepo.users).to.be.a('array')
  })

  it('should be a user object', () => {
    userRepo.getCurrentUser("Autumn Toy")
    expect(userRepo.currentUser).to.deep.equal(user)
  })
})

