import chai from 'chai';
const expect = chai.expect;
import BookingsRepo from '../src/BookingsRepo.js'
import bookings from '../test/DUMMY.js';
import RoomsRepo from '../src/RoomsRepo.js';

var availableRoom = [ { number: 6,
  roomType: 'residential suite',
  bidet: false,
  bedSize: 'twin',
  numBeds: 1,
  costPerNight: 426.45 } ]

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
    expect(bookingsRepo.mostPopularDay()).to.equal('21/10/2019')
  })

  it('should find day with the most open rooms', () => {
    expect(bookingsRepo.leastPopularDay('18/07/2019')).to.equal('18/07/2019')
  })

  it('should return number of rooms available', () => {
    expect(bookingsRepo.numRoomsAvailable('21/10/2019')).to.equal(197)
  })

  it('should return rooms available by type for a given day', () => {
    expect(bookingsRepo.availableByType('21/10/2019', "residential suite"
      , roomsRepo)).to.deep.equal(availableRoom)
  })
})