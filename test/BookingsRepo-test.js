import chai from 'chai';
const expect = chai.expect;
import BookingsRepo from '../src/BookingsRepo.js'
import bookings from '../test/DUMMY.js';
import RoomsRepo from '../src/RoomsRepo.js';

describe('BookingsRepo', () => {
  let bookingsRepo, roomsRepo;
  
  beforeEach(() => {
    bookingsRepo = new BookingsRepo(bookings.bookings);
    roomsRepo = new RoomsRepo(bookings.rooms);
  })
  it('should be a function', () => {
    expect(BookingsRepo).to.be.a('function')
  })

  it('should be a new instance of userRepo', () => {
    expect(bookingsRepo).to.be.a.instanceOf(BookingsRepo)
  })

  it('should return an array', () => {
    expect(bookingsRepo.bookings).to.be.a('array')
  })

  it('should return open rooms by defined date', () => {
    expect(bookingsRepo.totalRoomCost('21/10/2019', roomsRepo))
      .to.equal(1041.14)
  })

  it('should find the most booked date', () => {
    expect(bookingsRepo.popularDay()).to.equal('21/10/2019')
  })

})