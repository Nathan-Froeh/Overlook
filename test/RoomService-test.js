import $ from 'jquery';
import chai from 'chai';
const expect = chai.expect;
import RoomService from '../src/RoomService.js'
import RoomServiceRepo from '../src/RoomServiceRepo.js'
import service from '../test/DUMMY.js';

let orders = [
  {
    "userID": 9,
    "date": "15/07/2019",
    "food": "Tasty Fresh Sandwich",
    "totalCost": 13.07
  }, {
    "userID": 9,
    "date": "16/07/2019",
    "food": "Rustic Soft Sandwich",
    "totalCost": 18.63
  }
]

let newOrder = [
  {
    "userID": 1,
    "date": "24/12/2019",
    "food": "Generic Plastic Sandwich",
    "totalCost": 9.48
  },
  {
    "userID": 1,
    "date": "24/12/2019",
    "food": "Generic Soft Sandwich",
    "totalCost": 24.24
  },
  {
    "userID": 1,
    "date": "15/07/2019",
    "food": "Tasty Fresh Sandwich",
    "totalCost": 13.07
  },
  {
    "userID": 1,
    "date": "01/01/2020",
    "food": "Rustic Soft Sandwich",
    "totalCost": 18.63
  }
]

describe('RoomService', () => {
  let roomService, roomServiceRepo;
  
  beforeEach(() => {
    roomServiceRepo = new RoomServiceRepo(service.roomService);
    roomService = new RoomService(9, orders);
  })
  it('should be a function', () => {
    expect(RoomService).to.be.a('function')
  })

  it('should be a new instance of userRepo', () => {
    expect(roomService).to.be.a.instanceOf(RoomService)
  })

  it('should return total cost of todays orders', () => {
    expect(roomService.todaysTotal("16/07/2019")).to.equal(18.63)
  })

  it('should return total spent on room service', () => {
    expect(roomService.totalOrders()).to.equal(31.7)
  })

  it('should return sorted orders by date', () => {
    roomService = new RoomService(1, newOrder);
    expect(roomService.sortOrdersByDate()).to.deep.equal({ '24/12/2019':
    [ 'Generic Plastic Sandwich for $9.48',
      'Generic Soft Sandwich for $24.24' ],
    '15/07/2019': [ 'Tasty Fresh Sandwich for $13.07' ],
    '01/01/2020': [ 'Rustic Soft Sandwich for $18.63' ] })
  })

  
})