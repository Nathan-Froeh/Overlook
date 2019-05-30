import chai from 'chai';
const expect = chai.expect;
import RoomsRepo from '../src/RoomsRepo.js'
import rooms from '../test/DUMMY.js';


describe('RoomsRepo', () => {
  let roomsRepo;
  
  beforeEach(() => {
    roomsRepo = new RoomsRepo(rooms.rooms);
  })
  it('should be a function', () => {
    expect(RoomsRepo).to.be.a('function')
  })

  it('should be a new instance of userRepo', () => {
    expect(roomsRepo).to.be.a.instanceOf(RoomsRepo)
  })

  it('should return an array', () => {
    expect(roomsRepo.rooms).to.be.a('array')
  })

  it('should return open rooms by defined date', () => {
    expect(roomsRepo.totalRoomsAvailable()).to.equal()
  })
})