import $ from 'jquery';
import chai from 'chai';
const expect = chai.expect;
import UserRepo from '../src/UserRepo.js'


describe('UserRepo', () => {
  let userRepo;
  let users = [
    {
      "id": 1,
      "name": "Autumn Toy"
    },
    {
      "id": 2,
      "name": "Jannie VonRueden"
    },
    {
      "id": 3,
      "name": "Anya Upton"
    },
    {
      "id": 4,
      "name": "Milo Ankunding"
    },
    {
      "id": 5,
      "name": "Reginald Schaden"
    },
    {
      "id": 6,
      "name": "Sedrick Bayer"
    },
    {
      "id": 7,
      "name": "Kathryn Medhurst"
    },
    {
      "id": 8,
      "name": "Meredith Jenkins"
    },
    {
      "id": 9,
      "name": "Florine Jaskolski"
    },
    {
      "id": 10,
      "name": "Kiel O'Reilly"
    }
  ]
  beforeEach(() => {
    userRepo = new UserRepo(users);
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
})

