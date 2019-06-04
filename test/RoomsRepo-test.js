import chai from 'chai';
const expect = chai.expect;
import RoomsRepo from '../src/RoomsRepo.js'
import rooms from '../test/DUMMY.js';
import BookingsRepo from '../src/BookingsRepo.js';

describe('RoomsRepo', () => {
  let roomsRepo, bookingsRepo;
  
  beforeEach(() => {
    bookingsRepo = new BookingsRepo(rooms.bookings);
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
    expect(roomsRepo.totalRoomsAvailable(bookingsRepo, '21/10/2019'))
      .to.equal(197)
  })

  it.skip('should return % of rooms filled today', () => {
    expect(roomsRepo.percentRoomsAvailable(bookingsRepo, '21/10/2019'))
      .to.equal(30)
  })

})